import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type { ClassMap, MultipleAppearance } from '../../core/classes.js';
import { cx, multipleAppearanceClasses } from '../../core/classes.js';

type ButtonVariant =
  | 'default'
  | 'flat'
  | 'link'
  | 'menu'
  | 'taskbar'
  | 'thin'
  | 'toolbar'
  | 'windowTitle';

export type ButtonAppearance = 'active' | 'down' | 'main';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  appearance?: MultipleAppearance<ButtonAppearance>;
  classes?: ClassMap;
}

interface BaseButtonProps extends ButtonProps {
  variant: ButtonVariant;
}

const variantClassNames = {
  default: 'Button',
  flat: 'FlatButton',
  link: 'LinkButton',
  menu: 'MenuButton',
  taskbar: 'TaskbarButton',
  thin: 'ThinButton',
  toolbar: 'ToolbarButton',
  windowTitle: 'WindowTitleButton',
} as const;

function BaseButton({
  children,
  className,
  classes,
  appearance,
  variant,
  ...props
}: BaseButtonProps): ReactNode {
  return jsx('button', {
    type: 'button',
    ...props,
    className: cx(
      classes,
      [variantClassNames[variant], ...multipleAppearanceClasses(appearance)],
      className,
    ),
    children,
  });
}

export function Button(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'default' });
}

export function FlatButton(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'flat' });
}

export function LinkButton(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'link' });
}

export function MenuButton(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'menu' });
}

export function TaskbarButton(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'taskbar' });
}

export function ThinButton(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'thin' });
}

export function ToolbarButton(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'toolbar' });
}

export function WindowTitleButton(props: ButtonProps): ReactNode {
  return jsx(BaseButton, { ...props, variant: 'windowTitle' });
}
