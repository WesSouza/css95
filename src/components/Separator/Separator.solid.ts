import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap } from '../../core/classes.js';
import { cx } from '../../core/classes.js';
import { element, omit } from '../../core/solid.js';

export interface SeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
  vertical?: boolean;
}

export function Separator(props: SeparatorProps): JSX.Element {
  const rest = omit(props, new Set(['class', 'classes', 'vertical']));
  return element(
    h('div', {
      role: 'separator',
      ...rest,
      class: cx(
        props.classes,
        ['Separator', props.vertical && '-vertical'],
        props.class,
      ),
    }),
  );
}
