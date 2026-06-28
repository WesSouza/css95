import type { HTMLAttributes, ReactNode } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { css95StateProps } from '../../core/classes.js';
import { cx, states } from '../../core/classes.js';

export interface WindowProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'>, css95StateProps {
  title?: ReactNode;
  icon?: ReactNode;
  titleButtons?: ReactNode;
}

export function Window({
  active,
  children,
  className,
  classes,
  down,
  grow,
  icon,
  main,
  maximized,
  minimized,
  title,
  titleButtons,
  ...props
}: WindowProps): ReactNode {
  return jsxs('section', {
    ...props,
    className: cx(
      classes,
      ['Window', ...states({ active, down, grow, main, maximized, minimized })],
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
