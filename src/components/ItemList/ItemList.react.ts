import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type {
  ClassMap,
  ElementName,
  MultipleAppearance,
} from '../../core/html.js';
import { cx, multipleAppearanceClasses } from '../../core/html.js';

export type ItemListAppearance = 'icons' | 'list' | 'table';

export interface ItemListProps extends HTMLAttributes<HTMLElement> {
  appearance?: MultipleAppearance<ItemListAppearance>;
  as?: ElementName;
  classes?: ClassMap;
}

export function ItemList({
  appearance,
  as: Component = 'ul',
  children,
  className,
  classes,
  ...props
}: ItemListProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(
      classes,
      ['ItemList', ...multipleAppearanceClasses(appearance)],
      className,
    ),
    children,
  });
}
