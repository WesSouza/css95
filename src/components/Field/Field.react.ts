import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type { ClassMap } from '../../core/classes.js';
import { cx } from '../../core/classes.js';

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
}

export function Field({
  children,
  className,
  classes,
  ...props
}: FieldProps): ReactNode {
  return jsx('div', {
    ...props,
    className: cx(classes, ['Field'], className),
    children,
  });
}
