import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap, MultipleAppearance } from '../../core/html.js';
import { cx, multipleAppearanceClasses } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';

export type WindowAppearance = 'active' | 'maximized' | 'minimized';

export interface WindowProps extends Omit<
  JSX.HTMLAttributes<HTMLElement>,
  'title'
> {
  appearance?: MultipleAppearance<WindowAppearance>;
  classes?: ClassMap;
  title?: JSX.Element;
  icon?: JSX.Element;
  titleButtons?: JSX.Element;
}

const windowKeys = new Set([
  'appearance',
  'children',
  'class',
  'classes',
  'icon',
  'title',
  'titleButtons',
]);

export function Window(props: WindowProps): JSX.Element {
  const rest = omit(props, windowKeys);
  return element(
    h(
      'section',
      {
        ...rest,
        class: cx(
          props.classes,
          ['Window', ...multipleAppearanceClasses(props.appearance)],
          props.class,
        ),
      },
      [
        h('div', { class: cx(props.classes, ['WindowTitleBar']) }, [
          props.icon
            ? h(
                'span',
                { class: cx(props.classes, ['WindowTitleIcon']) },
                props.icon,
              )
            : null,
          h(
            'span',
            { class: cx(props.classes, ['WindowTitleText']) },
            props.title,
          ),
          props.titleButtons
            ? h(
                'div',
                { class: cx(props.classes, ['WindowTitleButtons']) },
                props.titleButtons,
              )
            : null,
        ]),
        h(
          'div',
          { class: cx(props.classes, ['WindowContent']) },
          props.children,
        ),
      ],
    ),
  );
}
