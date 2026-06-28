import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { css95StateProps } from '../../core/classes.js';
import { cx, stateKeys, states } from '../../core/classes.js';
import { element, omit } from '../../core/solid.js';

export interface TextBoxProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>, css95StateProps {
  as?: 'input' | 'textarea' | ((props: Record<string, unknown>) => JSX.Element);
}

export function TextBox(props: TextBoxProps): JSX.Element {
  const Component = props.as ?? 'input';
  const rest = omit(props, new Set([...stateKeys, 'as', 'class']));
  return element(
    h(Component, {
      ...rest,
      class: cx(props.classes, ['TextBox', ...states(props)], props.class),
    }),
  );
}
