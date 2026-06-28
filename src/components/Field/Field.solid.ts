import type { JSX } from "solid-js";
import h from "solid-js/h";
import type { css95StateProps } from "../../core/classes.js";
import { cx, stateKeys, states } from "../../core/classes.js";
import { element, omit } from "../../core/solid.js";

export type FieldProps = JSX.HTMLAttributes<HTMLDivElement> & css95StateProps;

export function Field(props: FieldProps): JSX.Element {
  const rest = omit(props, new Set([...stateKeys, "children", "class"]));
  return element(
    h(
      "div",
      {
        ...rest,
        class: cx(props.classes, ["Field", ...states(props)], props.class),
      },
      props.children,
    ),
  );
}
