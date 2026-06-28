import type { HTMLAttributes, ReactNode } from "react";
import { jsx } from "react/jsx-runtime";
import type { css95StateProps } from "../../core/classes.js";
import { cx, states } from "../../core/classes.js";

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "title">, css95StateProps {
  flat?: boolean;
  menu?: boolean;
  title?: boolean;
}

export function Button({
  active,
  children,
  className,
  classes,
  down,
  flat,
  grow,
  main,
  maximized,
  menu,
  minimized,
  title,
  ...props
}: ButtonProps): ReactNode {
  const base = title
    ? "WindowTitleButton"
    : menu
      ? "MenuButton"
      : flat
        ? "FlatButton"
        : "Button";
  return jsx("button", {
    type: "button",
    ...props,
    className: cx(
      classes,
      [base, ...states({ active, down, grow, main, maximized, minimized })],
      className,
    ),
    children,
  });
}
