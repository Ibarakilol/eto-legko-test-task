# AGENTS.md

## Working rules

- For TypeScript code, also follow [TYPESCRIPT_STYLE_GUIDE.md](TYPESCRIPT_STYLE_GUIDE.md).
  If it overlaps with the rules in this file, this file takes precedence.
- Before changing code, trace the affected flow and check existing helpers and callers.
  Use the simplest solution that satisfies the current requirements;
  reuse existing mechanisms and fix shared causes where appropriate.
- Add an abstraction, configuration option, enum or extra state
  only when a concrete current case requires it and existing mechanisms cannot express the behavior.
  Before committing, remove additions that duplicate existing behavior or
  serve only hypothetical future needs. Preserve required validation, error handling,
  security and accessibility.
- Keep definitions ordered by responsibility and the actual workflow: constants and required
  types first, then initialization and configuration, preparation and validation, entry,
  processing, exit, and cleanup where applicable. Keep related functions, methods, variables
  and helpers together near the stage they support.
  Follow dependencies when choosing the order, and preserve runtime behavior,
  decorator registration order, initialization dependencies and model field order.
- Do not create or modify tests or README files unless the user explicitly requests them.
  Verify with the existing checks (lint, formatting, type check, build, tests) and,
  where possible, practical runtime checks.
- Commit completed changes before finishing, unless the user explicitly asks to leave them
  uncommitted.
  Split independent changes into separate commits.
  Follow the commit rules in [Commit messages](#commit-messages) and the relevant checks.

Final summary, in the user's language, after the work is done and committed:

- Cover the changes and fixes, verification results, commits, and any nuances,
  limitations or unfinished checks.
- Include suggestions for the application's logic or code when useful,
  clearly marked as suggestions rather than completed work.
- If verification is incomplete, say what remains unverified and propose concrete next steps,
  including what the user can do and what information is needed.
- Distinguish simulated checks, live API validation and actual execution
  when reporting integration results.

## Language

Code comments, commit messages, console output and the README are in English.

## Code comments

Comments are the exception, not the default. Write code without comments
unless one of the cases below applies.

Budget: at most 1 comment line per 10 lines of code in a file. A single
comment is at most 2 lines. If it needs more, it is not a comment —
it belongs in the commit message

A comment is allowed only when:

- an external constraint is invisible from the code (library bug, API limit,
  protocol requirement) — include a link or issue reference;
- the code deliberately departs from the obvious implementation and would
  otherwise be "fixed" back — state it in one sentence, without
  justification;
- a non-trivial formula or algorithm needs attribution — link the source, do
  not restate it.

Never:

- restate what the next line does;
- explain why an alternative approach was NOT chosen;
- describe consequences or failure scenarios that are readable from the code;
- add JSDoc/docstrings to private functions with descriptive names and
  obvious parameters, or `@param`/`@returns` that repeat the signature and
  types;
- record the state of external data as of a date (policy versions, feed
  contents, "these are the only three today") — it silently goes stale;
  encode that in a runtime check instead;
- describe what the code used to do, what was removed or where something
  lived before ("keys no longer live here", "now in settings instead of the
  header") — history belongs in the commit message, a comment describes only
  the code as it is;
- add section-header comments inside a function.

## Commit messages

Structure, always:

    <type>(<scope>): <short summary>

    <body — optional>

No footer, ever — no `BREAKING CHANGE:`, no `Closes #123`, nothing after the
body.

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`, `revert`.

A commit message must:

- be written in English;
- use the imperative mood in the summary ("add", not "added" or "adds");
- keep the summary under 72 characters, no trailing period;
- leave exactly one blank line between summary and body;
- use the body to explain why the change was made, not what changed — the
  diff already shows what;
- cover exactly one logical change.

Never:

- add a footer of any kind;
- combine an unrelated fix, refactor, or feature in one commit;
- restate the diff in the body;
- describe a breaking change anywhere but the summary line.

A breaking change is marked with `!` right after the type/scope, in the
summary itself, not in a footer:

    feat(api)!: change response shape of /users

Examples:

    feat(auth): add Google sign-in

    fix(api): handle empty server response

    docs(conventions): clarify repository instructions

    refactor(user-service): extract validation logic into its own module

    fix(payment): prevent double charge on repeated click

    Button stayed enabled after the first click, letting a user on a slow
    connection fire multiple requests before the first one completed.
