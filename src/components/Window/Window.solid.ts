import type { JSX } from "solid-js";
import h from "solid-js/h";
import type { css95StateProps } from "../../core/classes.js";
import { cx, stateKeys, states } from "../../core/classes.js";
import { element, omit } from "../../core/solid.js";

export interface WindowProps
  extends Omit<JSX.HTMLAttributes<HTMLElement>, "title">, css95StateProps {
  title?: JSX.Element;
  icon?: JSX.Element;
  titleButtons?: JSX.Element;
}

export function Window(props: WindowProps): JSX.Element {
  const rest = omit(
    props,
    new Set([
      ...stateKeys,
      "children",
      "class",
      "icon",
      "title",
      "titleButtons",
    ]),
  );
  return element(
    h(
      "section",
      {
        ...rest,
        class: cx(props.classes, ["Window", ...states(props)], props.class),
      },
      [
        h("div", { class: cx(props.classes, ["WindowTitleBar"]) }, [
          props.icon
            ? h(
                "span",
                { class: cx(props.classes, ["WindowTitleIcon"]) },
                props.icon,
              )
            : null,
          h(
            "span",
            { class: cx(props.classes, ["WindowTitleText"]) },
            props.title,
          ),
          props.titleButtons
            ? h(
                "div",
                { class: cx(props.classes, ["WindowTitleButtons"]) },
                props.titleButtons,
              )
            : null,
        ]),
        h(
          "div",
          { class: cx(props.classes, ["WindowContent"]) },
          props.children,
        ),
      ],
    ),
  );
}
