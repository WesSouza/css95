# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added concrete React and Solid button exports matching CSS class names:
  - `Button`
  - `FlatButton`
  - `LinkButton`
  - `MenuButton`
  - `TaskbarButton`
  - `ThinButton`
  - `ToolbarButton`
  - `WindowTitleButton`
- Added concrete React and Solid menu exports:
  - `Menu`
  - `ListBoxMenu`
  - `VerticalBarMenu`
- Added concrete React and Solid separator exports:
  - `Separator`
  - `HorizontalSeparator`
  - `VerticalSeparator`
- Added component-specific appearance types such as `ButtonAppearance`, `WindowAppearance`, and `MenuItemAppearance`.
- Added shared class helpers for framework adapters, including `multipleAppearanceClasses`.

### Changed

- Restructured React and Solid component implementations into per-component folders under `src/components`.
- Changed `Button` state handling to `appearance?: "active" | "down" | "main" | Array<...>`.
- Changed `Window` state handling to `appearance?: "active" | "maximized" | "minimized" | Array<...>`.
- Changed `MenuItem` state handling to `appearance?: "active" | "disabled"`.

### Removed

- Removed shared component state props such as `active`, `down`, `grow`, `main`, `maximized`, and `minimized`.
- Removed boolean `Button` variant props in favor of concrete button exports.
- Removed `Menu`'s `listBox` prop in favor of `ListBoxMenu`.
- Removed `Separator`'s `vertical` prop in favor of `VerticalSeparator`.
- Removed irrelevant shared state props from `Field` and `TextBox`.

## [0.1.0] - 2026-06-27

### Added

- Initial extraction of Windows 95-inspired CSS from `wes.dev`.
- Added global CSS, CSS Module output, theme tokens, and React/Solid presentational component adapters.
