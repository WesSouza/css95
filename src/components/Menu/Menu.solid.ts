import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap } from '../../core/html.js';
import { cx } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';

type MenuVariant = 'default' | 'listBox' | 'verticalBar';

export type MenuItemAppearance = 'active' | 'disabled';

export interface MenuProps extends JSX.HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
}

interface BaseMenuProps extends MenuProps {
  variant: MenuVariant;
}

export interface MenuItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  appearance?: MenuItemAppearance;
  classes?: ClassMap;
  icon?: JSX.Element;
}

const menuVariantClassNames = {
  default: undefined,
  listBox: '-listBox',
  verticalBar: '-verticalBar',
} as const;

const menuKeys = new Set(['children', 'class', 'classes', 'variant']);
const menuItemKeys = new Set([
  'appearance',
  'children',
  'class',
  'classes',
  'icon',
]);

function BaseMenu(props: BaseMenuProps): JSX.Element {
  const rest = omit(props, menuKeys);
  return element(
    h(
      'div',
      {
        ...rest,
        class: cx(
          props.classes,
          ['Menu', menuVariantClassNames[props.variant]],
          props.class,
        ),
      },
      props.children,
    ),
  );
}

export function Menu(props: MenuProps): JSX.Element {
  return BaseMenu({ ...props, variant: 'default' });
}

export function ListBoxMenu(props: MenuProps): JSX.Element {
  return BaseMenu({ ...props, variant: 'listBox' });
}

export function VerticalBarMenu(props: MenuProps): JSX.Element {
  return BaseMenu({ ...props, variant: 'verticalBar' });
}

export function MenuItem(props: MenuItemProps): JSX.Element {
  const rest = omit(props, menuItemKeys);
  return element(
    h(
      'div',
      {
        role: 'menuitem',
        ...rest,
        class: cx(
          props.classes,
          ['MenuItem', props.appearance && `-${props.appearance}`],
          props.class,
        ),
      },
      [
        props.icon
          ? h('span', { class: cx(props.classes, ['MenuIcon']) }, props.icon)
          : null,
        h('span', { class: cx(props.classes, ['MenuLabel']) }, props.children),
      ],
    ),
  );
}
