import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type {
  ClassMap,
  ElementName,
  MultipleAppearance,
} from '../../core/html.js';
import { cx, multipleAppearanceClasses } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';

export type ItemListAppearance = 'icons' | 'list' | 'table';

export interface ItemListProps extends JSX.HTMLAttributes<HTMLElement> {
  appearance?: MultipleAppearance<ItemListAppearance>;
  as?: ElementName;
  classes?: ClassMap;
}

const itemListKeys = new Set([
  'appearance',
  'as',
  'children',
  'class',
  'classes',
]);

export function ItemList(props: ItemListProps): JSX.Element {
  const Component = props.as ?? 'ul';
  const rest = omit(props, itemListKeys);
  return element(
    h(
      Component,
      {
        ...rest,
        class: cx(
          props.classes,
          ['ItemList', ...multipleAppearanceClasses(props.appearance)],
          props.class,
        ),
      },
      props.children,
    ),
  );
}
