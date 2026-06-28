import type { HTMLAttributes, ReactNode } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { ClassMap } from '../../core/html.js';
import { cx } from '../../core/html.js';

type MenuVariant = 'default' | 'listBox' | 'verticalBar';

export type MenuItemAppearance = 'active' | 'disabled';

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
}

interface BaseMenuProps extends MenuProps {
  variant: MenuVariant;
}

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  appearance?: MenuItemAppearance;
  classes?: ClassMap;
  icon?: ReactNode;
}

const menuVariantClassNames = {
  default: undefined,
  listBox: '-listBox',
  verticalBar: '-verticalBar',
} as const;

function BaseMenu({
  children,
  className,
  classes,
  variant,
  ...props
}: BaseMenuProps): ReactNode {
  return jsx('div', {
    ...props,
    className: cx(classes, ['Menu', menuVariantClassNames[variant]], className),
    children,
  });
}

export function Menu(props: MenuProps): ReactNode {
  return jsx(BaseMenu, { ...props, variant: 'default' });
}

export function ListBoxMenu(props: MenuProps): ReactNode {
  return jsx(BaseMenu, { ...props, variant: 'listBox' });
}

export function VerticalBarMenu(props: MenuProps): ReactNode {
  return jsx(BaseMenu, { ...props, variant: 'verticalBar' });
}

export function MenuItem({
  appearance,
  children,
  className,
  classes,
  icon,
  ...props
}: MenuItemProps): ReactNode {
  return jsxs('div', {
    role: 'menuitem',
    ...props,
    className: cx(
      classes,
      ['MenuItem', appearance && `-${appearance}`],
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
