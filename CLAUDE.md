# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@TYPESCRIPT_STYLE_GUIDE.md

## Commands

Package manager is Yarn; Node `^22.12 || >=24`.

- `yarn lint` — `lint:ts` (`tsc --noEmit`) plus `lint:js` (`eslint . --max-warnings 0`). Run both before committing.
- `yarn format` — `prettier --write .`.
- Husky + lint-staged run eslint and prettier on staged files (active once the project is a git repository).
- There is no test runner configured.

## Architecture

A console script in Node.js + TypeScript that measures download speed. Source lives in `src/`; TypeScript files are run through `tsx`.
