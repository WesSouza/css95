import type { JSX } from "solid-js";
import h from "solid-js/h";
import type { css95StateProps } from "../../core/classes.js";
import { cx, stateKeys, states } from "../../core/classes.js";
import { element, omit } from "../../core/solid.js";

export interface ButtonProps
  extends
    Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "title">,
    css95StateProps {
  flat?: boolean;
  menu?: boolean;
  title?: boolean;
}

export function Button(props: ButtonProps): JSX.Element {
  const rest = omit(
    props,
    new Set([...stateKeys, "children", "class", "flat", "menu", "title"]),
  );
  const base = props.title
    ? "WindowTitleButton"
    : props.menu
      ? "MenuButton"
      : props.flat
        ? "FlatButton"
        : "Button";
  return element(
    h(
      "button",
      {
        type: "button",
        ...rest,
        class: cx(props.classes, [base, ...states(props)], props.class),
      },
      props.children,
    ),
  );
}
