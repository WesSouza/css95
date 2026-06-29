import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type {
  ClassMap,
  ElementName,
  MultipleAppearance,
} from '../../core/html.js';
import { cx, multipleAppearanceClasses } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';
import type { ButtonProps } from '../Button/Button.solid.js';
import { Button } from '../Button/Button.solid.js';

export type ExplorerListAppearance = 'details' | 'icons' | 'list';

export interface ExplorerListProps extends JSX.HTMLAttributes<HTMLElement> {
  appearance?: MultipleAppearance<ExplorerListAppearance>;
  as?: ElementName;
  classes?: ClassMap;
}

export interface ExplorerListSubcomponentProps extends JSX.HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

export interface ExplorerListHeaderButtonProps extends ButtonProps {
  classes?: ClassMap;
}

export interface ExplorerListComponent {
  (props: ExplorerListProps): JSX.Element;
  HeaderButton: (props: ExplorerListHeaderButtonProps) => JSX.Element;
  Item: (props: ExplorerListSubcomponentProps) => JSX.Element;
  ItemLabel: (props: ExplorerListSubcomponentProps) => JSX.Element;
}

const explorerListKeys = new Set([
  'appearance',
  'as',
  'children',
  'class',
  'classes',
]);
const explorerListSubcomponentKeys = new Set([
  'as',
  'children',
  'class',
  'classes',
]);

function hasAppearance(
  appearance: ExplorerListProps['appearance'],
  value: ExplorerListAppearance,
) {
  return Array.isArray(appearance)
    ? appearance.includes(value)
    : appearance === value;
}

function ExplorerListRoot(props: ExplorerListProps): JSX.Element {
  const Component =
    props.as ?? (hasAppearance(props.appearance, 'details') ? 'table' : 'ul');
  const rest = omit(props, explorerListKeys);
  return element(
    h(
      Component,
      {
        ...rest,
        class: cx(
          props.classes,
          ['ExplorerList', ...multipleAppearanceClasses(props.appearance)],
          props.class,
        ),
      },
      props.children,
    ),
  );
}

function ExplorerListItem(props: ExplorerListSubcomponentProps): JSX.Element {
  const Component = props.as ?? 'li';
  const rest = omit(props, explorerListSubcomponentKeys);
  return element(
    h(
      Component,
      {
        ...rest,
        class: cx(props.classes, ['ExplorerListItem'], props.class),
      },
      props.children,
    ),
  );
}

function ExplorerListItemLabel(
  props: ExplorerListSubcomponentProps,
): JSX.Element {
  const Component = props.as ?? 'span';
  const rest = omit(props, explorerListSubcomponentKeys);
  return element(
    h(
      Component,
      {
        ...rest,
        class: cx(props.classes, ['ExplorerListItemLabel'], props.class),
      },
      props.children,
    ),
  );
}

function ExplorerListHeaderButton(
  props: ExplorerListHeaderButtonProps,
): JSX.Element {
  const className = cx(
    props.classes,
    ['ExplorerListHeaderButton'],
    props.class,
  );
  return Button({ ...props, class: className });
}

export const ExplorerList: ExplorerListComponent = Object.assign(
  ExplorerListRoot,
  {
    HeaderButton: ExplorerListHeaderButton,
    Item: ExplorerListItem,
    ItemLabel: ExplorerListItemLabel,
  },
);
