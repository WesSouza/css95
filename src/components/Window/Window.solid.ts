import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type {
  ClassMap,
  ElementName,
  MultipleAppearance,
} from '../../core/html.js';
import { cx, multipleAppearanceClasses } from '../../core/html.js';
import { element, omit } from '../../core/solid.js';

export type WindowAppearance = 'active' | 'maximized' | 'minimized';

export interface WindowProps extends JSX.HTMLAttributes<HTMLElement> {
  as?: ElementName;
  appearance?: MultipleAppearance<WindowAppearance>;
  classes?: ClassMap;
}

export interface WindowSubcomponentProps extends JSX.HTMLAttributes<HTMLElement> {
  as?: ElementName;
  classes?: ClassMap;
}

export interface WindowComponent {
  (props: WindowProps): JSX.Element;
  TitleBar: (props: WindowSubcomponentProps) => JSX.Element;
  TitleIcon: (props: WindowSubcomponentProps) => JSX.Element;
  TitleText: (props: WindowSubcomponentProps) => JSX.Element;
  TitleButtons: (props: WindowSubcomponentProps) => JSX.Element;
  Content: (props: WindowSubcomponentProps) => JSX.Element;
}

const windowKeys = new Set([
  'as',
  'appearance',
  'children',
  'class',
  'classes',
]);
const windowSubcomponentKeys = new Set(['as', 'children', 'class', 'classes']);

function WindowRoot(props: WindowProps): JSX.Element {
  const Component = props.as ?? 'section';
  const rest = omit(props, windowKeys);
  return element(
    h(
      Component,
      {
        ...rest,
        class: cx(
          props.classes,
          ['Window', ...multipleAppearanceClasses(props.appearance)],
          props.class,
        ),
      },
      props.children,
    ),
  );
}

function createWindowSubcomponent(
  defaultElement: ElementName,
  className: string,
) {
  return function WindowSubcomponent(
    props: WindowSubcomponentProps,
  ): JSX.Element {
    const Component = props.as ?? defaultElement;
    const rest = omit(props, windowSubcomponentKeys);
    return element(
      h(
        Component,
        {
          ...rest,
          class: cx(props.classes, [className], props.class),
        },
        props.children,
      ),
    );
  };
}

const WindowTitleBar = createWindowSubcomponent('div', 'WindowTitleBar');
const WindowTitleIcon = createWindowSubcomponent('span', 'WindowTitleIcon');
const WindowTitleText = createWindowSubcomponent('span', 'WindowTitleText');
const WindowTitleButtons = createWindowSubcomponent(
  'div',
  'WindowTitleButtons',
);
const WindowContent = createWindowSubcomponent('div', 'WindowContent');

export const Window: WindowComponent = Object.assign(WindowRoot, {
  TitleBar: WindowTitleBar,
  TitleIcon: WindowTitleIcon,
  TitleText: WindowTitleText,
  TitleButtons: WindowTitleButtons,
  Content: WindowContent,
});
