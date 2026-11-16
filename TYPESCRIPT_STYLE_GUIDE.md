# TypeScript Code Style Guide

## 1. Correct operation

Running the code produces no errors or warnings in the console.

## 2. Code style, readability and consistency

### Naming variables, constants and functions

- External contracts are preserved: API fields and option names of third-party libraries are not renamed to satisfy the internal naming rules.
- Names of variables, parameters, properties and methods start with a lowercase letter and use `camelCase`.
- Names of simple constants are written in capital letters with words separated by underscores: `UPPER_SNAKE_CASE`. The exception is enum-like objects (a set of named variants of one type).
- The code contains no "magic values": each such value gets its own variable named like a constant.
- Names of values are English nouns. Abbreviated variable names are acceptable if the abbreviation is widely used.
- A function or method name contains a verb matching the action performed. The exception is handler and callback functions.
- Callback functions passed in options or properties are named with the `on` prefix.

### Enumerations

Enumerations (`enum` and enum-like objects) are named with singular English nouns and start with a capital letter. Enumeration values are declared as constants.

**Bad:**

```ts
const exitCode = {
  success: 0,
  failure: 1,
};
```

**Good:**

```ts
const ExitCode = {
  SUCCESS: 0,
  FAILURE: 1,
};
```

### Naming arrays

Arrays are named with plural nouns or with Hungarian notation (the type is included in the name).

**Bad:**

```ts
const duration = [120, 98, 143];
```

**Good:**

```ts
const durations = [120, 98, 143];
```

### Quotes

All code uses single quotes.

## 3. Ordering of object properties, interface members and destructured fields

Properties are sorted alphabetically **within groups**. The order of the groups:

1. All other properties.
2. Callbacks and methods: properties with the `on` prefix, methods, and any property whose value is a function.

The rule does not apply to dictionaries with computed keys: the order of their keys determines the order of items. It is enforced by `eslint/sort-members.js`.

## 4. File structure

- All TS files of the application live in the `src` directory. Configuration files stay in the repository root.
- File names do not use mixed case: words are separated by hyphens.
- Constants and enumerations, TypeScript types and interfaces, and helper functions not tied to the entry point live in their own files in `src`, split by responsibility.
- Use named exports; default exports are used only where a tool requires them.

The elements of a file are arranged in this order:

1. Imports: Node.js built-ins and libraries first, then local modules.
2. Constants and types.
3. Functions, in the order of the workflow.
4. Exports.
