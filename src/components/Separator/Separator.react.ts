import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type { ClassMap } from '../../core/html.js';
import { cx } from '../../core/html.js';

type SeparatorVariant = 'horizontal' | 'vertical';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
}

interface BaseSeparatorProps extends SeparatorProps {
  variant: SeparatorVariant;
}

const separatorVariantClassNames = {
  horizontal: 'HorizontalSeparator',
  vertical: 'VerticalSeparator',
} as const;

function BaseSeparator({
  className,
  classes,
  variant,
  ...props
}: BaseSeparatorProps): ReactNode {
  return jsx('div', {
    role: 'separator',
    ...props,
    className: cx(classes, [separatorVariantClassNames[variant]], className),
  });
}

export function Separator(props: SeparatorProps): ReactNode {
  return jsx(BaseSeparator, { ...props, variant: 'horizontal' });
}

export function HorizontalSeparator(props: SeparatorProps): ReactNode {
  return jsx(BaseSeparator, { ...props, variant: 'horizontal' });
}

export function VerticalSeparator(props: SeparatorProps): ReactNode {
  return jsx(BaseSeparator, { ...props, variant: 'vertical' });
}
