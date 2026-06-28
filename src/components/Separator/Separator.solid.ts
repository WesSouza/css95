import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap } from '../../core/classes.js';
import { cx } from '../../core/classes.js';
import { element, omit } from '../../core/solid.js';

type SeparatorVariant = 'horizontal' | 'vertical';

export interface SeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
}

interface BaseSeparatorProps extends SeparatorProps {
  variant: SeparatorVariant;
}

const separatorVariantClassNames = {
  horizontal: 'HorizontalSeparator',
  vertical: 'VerticalSeparator',
} as const;

const separatorKeys = new Set(['class', 'classes', 'variant']);

function BaseSeparator(props: BaseSeparatorProps): JSX.Element {
  const rest = omit(props, separatorKeys);
  return element(
    h('div', {
      role: 'separator',
      ...rest,
      class: cx(
        props.classes,
        [separatorVariantClassNames[props.variant]],
        props.class,
      ),
    }),
  );
}

export function Separator(props: SeparatorProps): JSX.Element {
  return BaseSeparator({ ...props, variant: 'horizontal' });
}

export function HorizontalSeparator(props: SeparatorProps): JSX.Element {
  return BaseSeparator({ ...props, variant: 'horizontal' });
}

export function VerticalSeparator(props: SeparatorProps): JSX.Element {
  return BaseSeparator({ ...props, variant: 'vertical' });
}
