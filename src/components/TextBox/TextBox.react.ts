import type {
  ComponentType,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { jsx } from 'react/jsx-runtime';
import type { css95StateProps } from '../../core/classes.js';
import { cx, states } from '../../core/classes.js';

export interface TextBoxProps
  extends InputHTMLAttributes<HTMLInputElement>, css95StateProps {
  as?: 'input' | 'textarea' | ComponentType<Record<string, unknown>>;
}

export interface TextAreaBoxProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, css95StateProps {
  as: 'textarea';
}

export function TextBox({
  active,
  as: Component = 'input',
  className,
  classes,
  down,
  grow,
  main,
  maximized,
  minimized,
  ...props
}: TextBoxProps | TextAreaBoxProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(
      classes,
      [
        'TextBox',
        ...states({ active, down, grow, main, maximized, minimized }),
      ],
      className,
    ),
  });
}
