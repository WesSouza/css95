import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap, ElementName } from '../../core/html.js';
import { cx } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';

export interface VerticalHandleProps extends JSX.HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

const verticalHandleKeys = new Set(['as', 'class', 'classes']);

export function VerticalHandle(props: VerticalHandleProps): JSX.Element {
  const Component = props.as ?? 'div';
  const rest = omit(props, verticalHandleKeys);
  return element(
    h(Component, {
      ...rest,
      class: cx(props.classes, ['VerticalHandle'], props.class),
    }),
  );
}
