import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type { ClassMap, ElementName } from '../../core/html.js';
import { cx } from '../../core/html.js';

type BarVariant =
  | 'menu'
  | 'taskbar'
  | 'taskbarClock'
  | 'taskbarStatus'
  | 'taskbarWindows'
  | 'toolbar';

export interface BarProps extends HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

export interface TaskbarComponent {
  (props: BarProps): ReactNode;
  Clock: (props: BarProps) => ReactNode;
  Status: (props: BarProps) => ReactNode;
  Windows: (props: BarProps) => ReactNode;
}

interface BaseBarProps extends BarProps {
  variant: BarVariant;
}

const barVariantClassNames = {
  menu: 'MenuBar',
  taskbar: 'Taskbar',
  taskbarClock: 'TaskbarClock',
  taskbarStatus: 'TaskbarStatus',
  taskbarWindows: 'TaskbarWindows',
  toolbar: 'Toolbar',
} as const;

const barVariantDefaultElements = {
  menu: 'div',
  taskbar: 'footer',
  taskbarClock: 'div',
  taskbarStatus: 'div',
  taskbarWindows: 'div',
  toolbar: 'div',
} as const;

function BaseBar({
  as,
  children,
  className,
  classes,
  variant,
  ...props
}: BaseBarProps): ReactNode {
  const Component = as ?? barVariantDefaultElements[variant];
  return jsx(Component, {
    ...props,
    className: cx(classes, [barVariantClassNames[variant]], className),
    children,
  });
}

export function MenuBar(props: BarProps): ReactNode {
  return jsx(BaseBar, { ...props, variant: 'menu' });
}

function TaskbarRoot(props: BarProps): ReactNode {
  return jsx(BaseBar, { ...props, variant: 'taskbar' });
}

function TaskbarWindows(props: BarProps): ReactNode {
  return jsx(BaseBar, { ...props, variant: 'taskbarWindows' });
}

function TaskbarStatus(props: BarProps): ReactNode {
  return jsx(BaseBar, { ...props, variant: 'taskbarStatus' });
}

function TaskbarClock(props: BarProps): ReactNode {
  return jsx(BaseBar, { ...props, variant: 'taskbarClock' });
}

export const Taskbar: TaskbarComponent = Object.assign(TaskbarRoot, {
  Clock: TaskbarClock,
  Status: TaskbarStatus,
  Windows: TaskbarWindows,
});

export function Toolbar(props: BarProps): ReactNode {
  return jsx(BaseBar, { ...props, variant: 'toolbar' });
}
