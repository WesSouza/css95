import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type { ClassMap, ElementName } from '../../core/html.js';
import { cx } from '../../core/html.js';

export interface VerticalHandleProps extends HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

export function VerticalHandle({
  as: Component = 'div',
  className,
  classes,
  ...props
}: VerticalHandleProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['VerticalHandle'], className),
  });
}
