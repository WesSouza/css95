import type { HTMLAttributes, ReactNode } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { ClassMap, MultipleAppearance } from '../../core/classes.js';
import { cx, multipleAppearanceClasses } from '../../core/classes.js';

export type WindowAppearance = 'active' | 'maximized' | 'minimized';

export interface WindowProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'title'
> {
  appearance?: MultipleAppearance<WindowAppearance>;
  classes?: ClassMap;
  title?: ReactNode;
  icon?: ReactNode;
  titleButtons?: ReactNode;
}

export function Window({
  appearance,
  children,
  className,
  classes,
  icon,
  title,
  titleButtons,
  ...props
}: WindowProps): ReactNode {
  return jsxs('section', {
    ...props,
    className: cx(
      classes,
      ['Window', ...multipleAppearanceClasses(appearance)],
      className,
    ),
    children: [
      jsxs('div', {
        className: cx(classes, ['WindowTitleBar']),
        children: [
          icon
            ? jsx('span', {
                className: cx(classes, ['WindowTitleIcon']),
                children: icon,
              })
            : null,
          jsx('span', {
            className: cx(classes, ['WindowTitleText']),
            children: title,
          }),
          titleButtons
            ? jsx('div', {
                className: cx(classes, ['WindowTitleButtons']),
                children: titleButtons,
              })
            : null,
        ],
      }),
      jsx('div', {
        className: cx(classes, ['WindowContent']),
        children,
      }),
    ],
  });
}
