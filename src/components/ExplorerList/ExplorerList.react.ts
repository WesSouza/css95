import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type {
  ClassMap,
  ElementName,
  MultipleAppearance,
} from '../../core/html.js';
import { cx, multipleAppearanceClasses } from '../../core/html.js';
import type { ButtonProps } from '../Button/Button.react.js';
import { Button } from '../Button/Button.react.js';

export type ExplorerListAppearance = 'details' | 'icons' | 'list';

export interface ExplorerListProps extends HTMLAttributes<HTMLElement> {
  appearance?: MultipleAppearance<ExplorerListAppearance>;
  as?: ElementName;
  classes?: ClassMap;
}

export interface ExplorerListSubcomponentProps extends HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

export interface ExplorerListHeaderButtonProps extends ButtonProps {
  classes?: ClassMap;
}

export interface ExplorerListComponent {
  (props: ExplorerListProps): ReactNode;
  HeaderButton: (props: ExplorerListHeaderButtonProps) => ReactNode;
  Item: (props: ExplorerListSubcomponentProps) => ReactNode;
  ItemLabel: (props: ExplorerListSubcomponentProps) => ReactNode;
}

function hasAppearance(
  appearance: ExplorerListProps['appearance'],
  value: ExplorerListAppearance,
) {
  return Array.isArray(appearance)
    ? appearance.includes(value)
    : appearance === value;
}

function ExplorerListRoot({
  appearance,
  as,
  children,
  className,
  classes,
  ...props
}: ExplorerListProps): ReactNode {
  const Component =
    as ?? (hasAppearance(appearance, 'details') ? 'table' : 'ul');
  return jsx(Component, {
    ...props,
    className: cx(
      classes,
      ['ExplorerList', ...multipleAppearanceClasses(appearance)],
      className,
    ),
    children,
  });
}

function ExplorerListItem({
  as: Component = 'li',
  children,
  className,
  classes,
  ...props
}: ExplorerListSubcomponentProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['ExplorerListItem'], className),
    children,
  });
}

function ExplorerListItemLabel({
  as: Component = 'span',
  children,
  className,
  classes,
  ...props
}: ExplorerListSubcomponentProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['ExplorerListItemLabel'], className),
    children,
  });
}

function ExplorerListHeaderButton({
  className,
  classes,
  ...props
}: ExplorerListHeaderButtonProps): ReactNode {
  return jsx(Button, {
    ...props,
    className: cx(classes, ['ExplorerListHeaderButton'], className),
    classes,
  });
}

export const ExplorerList: ExplorerListComponent = Object.assign(
  ExplorerListRoot,
  {
    HeaderButton: ExplorerListHeaderButton,
    Item: ExplorerListItem,
    ItemLabel: ExplorerListItemLabel,
  },
);
