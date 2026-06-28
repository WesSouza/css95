import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type { css95StateProps } from '../../core/classes.js';
import { cx, states } from '../../core/classes.js';

export type FieldProps = HTMLAttributes<HTMLDivElement> & css95StateProps;

export function Field({
  active,
  children,
  className,
  classes,
  down,
  grow,
  main,
  maximized,
  minimized,
  ...props
}: FieldProps): ReactNode {
  return jsx('div', {
    ...props,
    className: cx(
      classes,
      ['Field', ...states({ active, down, grow, main, maximized, minimized })],
      className,
    ),
    children,
  });
}
