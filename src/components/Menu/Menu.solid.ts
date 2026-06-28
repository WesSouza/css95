import type { JSX } from "solid-js";
import h from "solid-js/h";
import type { css95StateProps } from "../../core/classes.js";
import { cx, stateKeys, states } from "../../core/classes.js";
import { element, omit } from "../../core/solid.js";

export interface MenuProps
  extends JSX.HTMLAttributes<HTMLDivElement>, css95StateProps {
  listBox?: boolean;
}

export interface MenuItemProps
  extends JSX.HTMLAttributes<HTMLDivElement>, css95StateProps {
  disabled?: boolean;
  icon?: JSX.Element;
}

export function Menu(props: MenuProps): JSX.Element {
  const rest = omit(
    props,
    new Set([...stateKeys, "children", "class", "listBox"]),
  );
  return element(
    h(
      "div",
      {
        ...rest,
        class: cx(
          props.classes,
          ["Menu", props.listBox && "-listBox", ...states(props)],
          props.class,
        ),
      },
      props.children,
    ),
  );
}

export function MenuItem(props: MenuItemProps): JSX.Element {
  const rest = omit(
    props,
    new Set([...stateKeys, "children", "class", "disabled", "icon"]),
  );
  return element(
    h(
      "div",
      {
        role: "menuitem",
        ...rest,
        class: cx(
          props.classes,
          ["MenuItem", props.disabled && "-disabled", ...states(props)],
          props.class,
        ),
      },
      [
        props.icon
          ? h("span", { class: cx(props.classes, ["MenuIcon"]) }, props.icon)
          : null,
        h("span", { class: cx(props.classes, ["MenuLabel"]) }, props.children),
      ],
    ),
  );
}
