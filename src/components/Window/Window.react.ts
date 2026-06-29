import type { HTMLAttributes, ReactNode } from 'react';
import { jsx } from 'react/jsx-runtime';
import type {
  ClassMap,
  ElementName,
  MultipleAppearance,
} from '../../core/html.js';
import { cx, multipleAppearanceClasses } from '../../core/html.js';

export type WindowAppearance = 'active' | 'maximized' | 'minimized';

export interface WindowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementName;
  appearance?: MultipleAppearance<WindowAppearance>;
  classes?: ClassMap;
}

export interface WindowSubcomponentProps extends HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

export interface WindowComponent {
  (props: WindowProps): ReactNode;
  TitleBar: (props: WindowSubcomponentProps) => ReactNode;
  TitleIcon: (props: WindowSubcomponentProps) => ReactNode;
  TitleText: (props: WindowSubcomponentProps) => ReactNode;
  TitleButtons: (props: WindowSubcomponentProps) => ReactNode;
  Content: (props: WindowSubcomponentProps) => ReactNode;
}

function WindowRoot({
  as: Component = 'section',
  appearance,
  children,
  className,
  classes,
  ...props
}: WindowProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(
      classes,
      ['Window', ...multipleAppearanceClasses(appearance)],
      className,
    ),
    children,
  });
}

function WindowTitleBar({
  as: Component = 'div',
  children,
  className,
  classes,
  ...props
}: WindowSubcomponentProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['WindowTitleBar'], className),
    children,
  });
}

function WindowTitleIcon({
  as: Component = 'span',
  children,
  className,
  classes,
  ...props
}: WindowSubcomponentProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['WindowTitleIcon'], className),
    children,
  });
}

function WindowTitleText({
  as: Component = 'span',
  children,
  className,
  classes,
  ...props
}: WindowSubcomponentProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['WindowTitleText'], className),
    children,
  });
}

function WindowTitleButtons({
  as: Component = 'div',
  children,
  className,
  classes,
  ...props
}: WindowSubcomponentProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['WindowTitleButtons'], className),
    children,
  });
}

function WindowContent({
  as: Component = 'div',
  children,
  className,
  classes,
  ...props
}: WindowSubcomponentProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ['WindowContent'], className),
    children,
  });
}

export const Window: WindowComponent = Object.assign(WindowRoot, {
  TitleBar: WindowTitleBar,
  TitleIcon: WindowTitleIcon,
  TitleText: WindowTitleText,
  TitleButtons: WindowTitleButtons,
  Content: WindowContent,
});
