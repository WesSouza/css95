import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap, ElementName } from '../../core/html.js';
import { cx } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';

type BarVariant =
  | 'menu'
  | 'taskbar'
  | 'taskbarClock'
  | 'taskbarStatus'
  | 'taskbarWindows'
  | 'toolbar';

export interface BarProps extends JSX.HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

export interface TaskbarComponent {
  (props: BarProps): JSX.Element;
  Clock: (props: BarProps) => JSX.Element;
  Status: (props: BarProps) => JSX.Element;
  Windows: (props: BarProps) => JSX.Element;
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

const barKeys = new Set(['as', 'children', 'class', 'classes', 'variant']);

function BaseBar(props: BaseBarProps): JSX.Element {
  const Component = props.as ?? barVariantDefaultElements[props.variant];
  const rest = omit(props, barKeys);
  return element(
    h(
      Component,
      {
        ...rest,
        class: cx(
          props.classes,
          [barVariantClassNames[props.variant]],
          props.class,
        ),
      },
      props.children,
    ),
  );
}

export function MenuBar(props: BarProps): JSX.Element {
  return BaseBar({ ...props, variant: 'menu' });
}

function TaskbarRoot(props: BarProps): JSX.Element {
  return BaseBar({ ...props, variant: 'taskbar' });
}

function TaskbarWindows(props: BarProps): JSX.Element {
  return BaseBar({ ...props, variant: 'taskbarWindows' });
}

function TaskbarStatus(props: BarProps): JSX.Element {
  return BaseBar({ ...props, variant: 'taskbarStatus' });
}

function TaskbarClock(props: BarProps): JSX.Element {
  return BaseBar({ ...props, variant: 'taskbarClock' });
}

export const Taskbar: TaskbarComponent = Object.assign(TaskbarRoot, {
  Clock: TaskbarClock,
  Status: TaskbarStatus,
  Windows: TaskbarWindows,
});

export function Toolbar(props: BarProps): JSX.Element {
  return BaseBar({ ...props, variant: 'toolbar' });
}
