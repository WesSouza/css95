import type {
  ComponentType,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { jsx } from 'react/jsx-runtime';
import type { ClassMap } from '../../core/html.js';
import { cx } from '../../core/html.js';

export interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: 'input' | 'textarea' | ComponentType<Record<string, unknown>>;
  classes?: ClassMap;
}

export interface TextAreaBoxProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
  classes?: ClassMap;
}

export function TextBox({
  as: Component = 'input',
  className,
  classes,
  ...props
}: TextBoxProps | TextAreaBoxProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['TextBox'], className),
  });
}
