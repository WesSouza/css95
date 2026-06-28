# AGENTS.md

`css95` is a Windows 95-inspired CSS package with React and Solid presentational adapters.

## Rules

- Run `pnpm run check` for verification when necessary, or at the end of a turn.
- Verify touched Markdown with Prettier.

## Structure

- Component adapters live in `src/components/<Component>/<Component>.react.ts` and `.solid.ts`.
- Public framework entrypoints are barrels in `src/react/index.ts` and `src/solid/index.ts`.
- Shared adapter helpers live in `src/core/`.

## Component APIs

- Avoid global/shared state props.
- Use component-specific `appearance` props for state-like CSS classes.
- Use private base components with `variant`, then export concrete components matching CSS class names.
- Prefer concrete exports over boolean variant props.
- Do not export private base components.
- Hoist constant Solid omit-key `Set`s outside component functions.
- Inspect `src/styles/css95/*.css` before exposing new appearances or variants.
- Use `multipleAppearanceClasses` when multiple appearance classes can apply at once.

## Changelog

Maintain `CHANGELOG.md` in Keep a Changelog style with `## [Unreleased]` at the top. Document adapter API breaks under `Changed`/`Removed`.
