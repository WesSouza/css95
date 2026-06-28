import type { HTMLAttributes, ReactNode } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { css95StateProps } from '../../core/classes.js';
import { cx, states } from '../../core/classes.js';

export interface MenuProps
  extends HTMLAttributes<HTMLDivElement>, css95StateProps {
  listBox?: boolean;
}

export interface MenuItemProps
  extends HTMLAttributes<HTMLDivElement>, css95StateProps {
  disabled?: boolean;
  icon?: ReactNode;
}

export function Menu({
  active,
  children,
  className,
  classes,
  down,
  grow,
  listBox,
  main,
  maximized,
  minimized,
  ...props
}: MenuProps): ReactNode {
  return jsx('div', {
    ...props,
    className: cx(
      classes,
      [
        'Menu',
        listBox && '-listBox',
        ...states({ active, down, grow, main, maximized, minimized }),
      ],
      className,
    ),
    children,
  });
}

export function MenuItem({
  active,
  children,
  className,
  classes,
  disabled,
  down,
  grow,
  icon,
  main,
  maximized,
  minimized,
  ...props
}: MenuItemProps): ReactNode {
  return jsxs('div', {
    role: 'menuitem',
    ...props,
    className: cx(
      classes,
      [
        'MenuItem',
        disabled && '-disabled',
        ...states({ active, down, grow, main, maximized, minimized }),
      ],
      className,
    ),
    children: [
      icon
        ? jsx('span', { className: cx(classes, ['MenuIcon']), children: icon })
        : null,
      jsx('span', { className: cx(classes, ['MenuLabel']), children }),
    ],
  });
}
