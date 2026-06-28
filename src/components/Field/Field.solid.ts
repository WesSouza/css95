import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap } from '../../core/classes.js';
import { cx } from '../../core/classes.js';
import { element, omit } from '../../core/solid.js';

export interface FieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
}

const fieldKeys = new Set(['children', 'class', 'classes']);

export function Field(props: FieldProps): JSX.Element {
  const rest = omit(props, fieldKeys);
  return element(
    h(
      'div',
      {
        ...rest,
        class: cx(props.classes, ['Field'], props.class),
      },
      props.children,
    ),
  );
}
