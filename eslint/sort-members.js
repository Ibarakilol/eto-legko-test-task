import ts from 'typescript';

const CALLBACK_NAME = /^on[A-Z]/;
const GROUP_PROPERTY = 0;
const GROUP_METHOD = 1;

const getGroup = ({ isMethod, name }) =>
  isMethod || CALLBACK_NAME.test(name) ? GROUP_METHOD : GROUP_PROPERTY;

const compareMembers = (first, second) =>
  getGroup(first) - getGroup(second) ||
  first.name.toLowerCase().localeCompare(second.name.toLowerCase(), 'en', { sensitivity: 'base' });

const isFunctionType = (type) => {
  const types = type.isUnion()
    ? type.types.filter((part) => !(part.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)))
    : [type];

  return types.length > 0 && types.every((part) => part.getCallSignatures().length > 0);
};

const rule = {
  create(context) {
    const { sourceCode } = context;
    const services = sourceCode.parserServices;
    const checker = services.program.getTypeChecker();

    const isFunctionNode = (node) =>
      node.type === 'ArrowFunctionExpression' ||
      node.type === 'FunctionExpression' ||
      isFunctionType(checker.getTypeAtLocation(services.esTreeNodeToTSNodeMap.get(node)));

    const isFunctionTypeNode = (node) =>
      isFunctionType(checker.getTypeFromTypeNode(services.esTreeNodeToTSNodeMap.get(node)));

    const checkSegment = (members) => {
      if (members.length < 2) {
        return;
      }

      const sorted = [...members].sort(compareMembers);
      const outOfOrderIndex = members.findIndex((member, index) => member !== sorted[index]);

      if (outOfOrderIndex < 0) {
        return;
      }

      const localNames = members.map((member) => member.localName).filter(Boolean);
      const hasDependentDefaults = members.some(
        (member) =>
          member.defaultText &&
          localNames.some(
            (name) =>
              name !== member.localName && new RegExp(`\\b${name}\\b`).test(member.defaultText)
          )
      );
      const first = members[0].node;
      const last = members[members.length - 1].node;
      const hasComments = sourceCode
        .getAllComments()
        .some((comment) => comment.range[0] >= first.range[0] && comment.range[1] <= last.range[1]);

      context.report({
        fix:
          hasComments || hasDependentDefaults
            ? null
            : (fixer) => {
                const text = sourceCode.getText();

                const splitDelimiter = (member) => {
                  const raw = sourceCode.getText(member.node);
                  const match = /[;,]$/.exec(raw);

                  return match
                    ? { core: raw.slice(0, -1), delimiter: match[0] }
                    : { core: raw, delimiter: '' };
                };

                let result = '';

                members.forEach((member, index) => {
                  result += splitDelimiter(sorted[index]).core + splitDelimiter(member).delimiter;

                  if (index < members.length - 1) {
                    result += text.slice(member.node.range[1], members[index + 1].node.range[0]);
                  }
                });

                return fixer.replaceTextRange([first.range[0], last.range[1]], result);
              },
        loc: members[outOfOrderIndex].node.loc,
        message: `Expected "${sorted[outOfOrderIndex].name}" to come before "${members[outOfOrderIndex].name}".`,
      });
    };

    const checkSegments = (items) => {
      let segment = [];

      for (const item of items) {
        if (item) {
          segment.push(item);
        } else {
          checkSegment(segment);
          segment = [];
        }
      }

      checkSegment(segment);
    };

    const getKeyName = (key) => (key.type === 'Identifier' ? key.name : String(key.value));

    const getSignature = (member) => {
      if (
        member.computed ||
        (member.type !== 'TSPropertySignature' && member.type !== 'TSMethodSignature')
      ) {
        return null;
      }

      return {
        isMethod:
          member.type === 'TSMethodSignature' ||
          (!!member.typeAnnotation && isFunctionTypeNode(member.typeAnnotation.typeAnnotation)),
        name: getKeyName(member.key),
        node: member,
      };
    };

    return {
      ObjectExpression(node) {
        checkSegments(
          node.properties.map((property) => {
            if (property.type !== 'Property' || property.computed) {
              return null;
            }

            return {
              isMethod: property.method || isFunctionNode(property.value),
              name: getKeyName(property.key),
              node: property,
            };
          })
        );
      },
      ObjectPattern(node) {
        checkSegments(
          node.properties.map((property) => {
            if (property.type !== 'Property' || property.computed) {
              return null;
            }

            const hasDefault = property.value.type === 'AssignmentPattern';
            const target = hasDefault ? property.value.left : property.value;

            return {
              defaultText: hasDefault ? sourceCode.getText(property.value.right) : '',
              isMethod: target.type === 'Identifier' && isFunctionNode(target),
              localName: target.type === 'Identifier' ? target.name : '',
              name: getKeyName(property.key),
              node: property,
            };
          })
        );
      },
      TSInterfaceBody(node) {
        checkSegments(node.body.map(getSignature));
      },
      TSTypeLiteral(node) {
        checkSegments(node.members.map(getSignature));
      },
    };
  },
  meta: {
    fixable: 'code',
    schema: [],
    type: 'layout',
  },
};

export default { rules: { 'sort-members': rule } };
