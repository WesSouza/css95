# css95

Windows 95-inspired CSS and presentational UI primitives extracted from `wes.dev`.

## Install

```sh
pnpm add css95
```

## Global CSS

```ts
import "css95/style.css";
```

The default scale is `2px`. Optionally set `--css95-scale` on a theme wrapper or ancestor to resize css95 components:

```css
.ThemeClassic {
  --css95-scale: 2px;
}
```

```html
<div class="ThemeClassic Screen">
  <section class="Window -active">
    <div class="WindowTitleBar">
      <span class="WindowTitleText">Control Panel</span>
    </div>
    <div class="WindowContent">Hello</div>
  </section>
</div>
```

## CSS Modules

```tsx
import styles from "css95/style.module.css";

<div class={styles.Window}>
  <div class={styles.WindowTitleBar}>Hello</div>
</div>;
```

State classes are available with bracket access:

```tsx
styles["-active"];
```

## Themes

`ThemeClassic` is the default Windows 95 palette. Additional React95-inspired palettes are available as `ThemeName` classes and component wrappers, such as `ThemeBee`.

```html
<div class="ThemeBee Screen">
  <section class="Window -active">
    <div class="WindowTitleBar">
      <span class="WindowTitleText">Control Panel</span>
    </div>
    <div class="WindowContent">Hello</div>
  </section>
</div>
```

## Solid

```tsx
import "css95/style.css";
import { Button, ThemeBee, Window } from "css95/solid";

<ThemeBee screen>
  <Window title="Control Panel" active>
    <Button>OK</Button>
  </Window>
</ThemeBee>;
```

## React

```tsx
import "css95/style.css";
import { Button, ThemeBee, Window } from "css95/react";

<ThemeBee screen>
  <Window title="Control Panel" active>
    <Button>OK</Button>
  </Window>
</ThemeBee>;
```

The component adapters do not import CSS. Import `css95/style.css` in your app, or pass CSS Module mappings with `classes={styles}`.

## License

MIT, https://wes.dev/LICENSE.txt
