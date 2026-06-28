import type { HTMLAttributes, ReactNode } from "react";
import { jsx } from "react/jsx-runtime";
import type { ClassMap } from "../../core/classes.js";
import { cx } from "../../core/classes.js";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
  vertical?: boolean;
}

export function Separator({
  className,
  classes,
  vertical,
  ...props
}: SeparatorProps): ReactNode {
  return jsx("div", {
    role: "separator",
    ...props,
    className: cx(classes, ["Separator", vertical && "-vertical"], className),
  });
}
