import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap, ElementName } from '../../core/html.js';
import { cx } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';

type SurfaceVariant = 'border' | 'field' | 'status' | 'well';

export interface SurfaceProps extends JSX.HTMLAttributes<HTMLElement> {
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

const surfaceKeys = new Set(['as', 'children', 'class', 'classes', 'variant']);

function BaseSurface(props: BaseSurfaceProps): JSX.Element {
  const Component = props.as ?? 'div';
  const rest = omit(props, surfaceKeys);
  return element(
    h(
      Component,
      {
        ...rest,
        class: cx(
          props.classes,
          [surfaceVariantClassNames[props.variant]],
          props.class,
        ),
      },
      props.children,
    ),
  );
}

export function Border(props: SurfaceProps): JSX.Element {
  return BaseSurface({ ...props, variant: 'border' });
}

export function Field(props: SurfaceProps): JSX.Element {
  return BaseSurface({ ...props, variant: 'field' });
}

export function StatusField(props: SurfaceProps): JSX.Element {
  return BaseSurface({ ...props, variant: 'status' });
}

export function Well(props: SurfaceProps): JSX.Element {
  return BaseSurface({ ...props, variant: 'well' });
}

export type FieldProps = SurfaceProps;
