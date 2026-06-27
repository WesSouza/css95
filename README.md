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

## Solid

```tsx
import "css95/style.css";
import { Button, Window } from "css95/solid";

<Window title="Control Panel" active>
  <Button>OK</Button>
</Window>;
```

## React

```tsx
import "css95/style.css";
import { Button, Window } from "css95/react";

<Window title="Control Panel" active>
  <Button>OK</Button>
</Window>;
```

The component adapters do not import CSS. Import `css95/style.css` in your app, or pass CSS Module mappings with `classes={styles}`.

## License

MIT, https://wes.dev/LICENSE.txt
