import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap, MultipleAppearance } from '../../core/classes.js';
import { cx, multipleAppearanceClasses } from '../../core/classes.js';
import { element, omit } from '../../core/solid.js';

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

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
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

const buttonKeys = new Set([
  'appearance',
  'children',
  'class',
  'classes',
  'variant',
]);

function BaseButton(props: BaseButtonProps): JSX.Element {
  const rest = omit(props, buttonKeys);
  return element(
    h(
      'button',
      {
        type: 'button',
        ...rest,
        class: cx(
          props.classes,
          [
            variantClassNames[props.variant],
            ...multipleAppearanceClasses(props.appearance),
          ],
          props.class,
        ),
      },
      props.children,
    ),
  );
}

export function Button(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'default' });
}

export function FlatButton(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'flat' });
}

export function LinkButton(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'link' });
}

export function MenuButton(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'menu' });
}

export function TaskbarButton(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'taskbar' });
}

export function ThinButton(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'thin' });
}

export function ToolbarButton(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'toolbar' });
}

export function WindowTitleButton(props: ButtonProps): JSX.Element {
  return BaseButton({ ...props, variant: 'windowTitle' });
}
