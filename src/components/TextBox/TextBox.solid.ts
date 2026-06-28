import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap } from '../../core/classes.js';
import { cx } from '../../core/classes.js';
import { element, omit } from '../../core/solid.js';

export interface TextBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  as?: 'input' | 'textarea' | ((props: Record<string, unknown>) => JSX.Element);
  classes?: ClassMap;
}

const textBoxKeys = new Set(['as', 'class', 'classes']);

export function TextBox(props: TextBoxProps): JSX.Element {
  const Component = props.as ?? 'input';
  const rest = omit(props, textBoxKeys);
  return element(
    h(Component, {
      ...rest,
      class: cx(props.classes, ['TextBox'], props.class),
    }),
  );
}
