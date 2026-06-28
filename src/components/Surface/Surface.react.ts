import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type { ClassMap, ElementName } from '../../core/html.js';
import { cx } from '../../core/html.js';

type SurfaceVariant = 'border' | 'field' | 'status' | 'well';

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

interface BaseSurfaceProps extends SurfaceProps {
  variant: SurfaceVariant;
}

const surfaceVariantClassNames = {
  border: 'Border',
  field: 'Field',
  status: 'StatusField',
  well: 'Well',
} as const;

function BaseSurface({
  as: Component = 'div',
  children,
  className,
  classes,
  variant,
  ...props
}: BaseSurfaceProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, [surfaceVariantClassNames[variant]], className),
    children,
  });
}

export function Border(props: SurfaceProps): ReactNode {
  return jsx(BaseSurface, { ...props, variant: 'border' });
}

export function Field(props: SurfaceProps): ReactNode {
  return jsx(BaseSurface, { ...props, variant: 'field' });
}

export function StatusField(props: SurfaceProps): ReactNode {
  return jsx(BaseSurface, { ...props, variant: 'status' });
}

export function Well(props: SurfaceProps): ReactNode {
  return jsx(BaseSurface, { ...props, variant: 'well' });
}

export type FieldProps = SurfaceProps;
