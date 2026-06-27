import type {
  ComponentType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";

export type ClassMap = Record<string, string | undefined>;

export interface css95StateProps {
  active?: boolean;
  down?: boolean;
  main?: boolean;
  grow?: boolean;
  maximized?: boolean;
  minimized?: boolean;
  classes?: ClassMap;
}

export interface WindowProps extends Omit<HTMLAttributes<HTMLElement>, "title">, css95StateProps {
  title?: ReactNode;
  icon?: ReactNode;
  titleButtons?: ReactNode;
}

export interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "title">, css95StateProps {
  flat?: boolean;
  menu?: boolean;
  title?: boolean;
}

export type FieldProps = HTMLAttributes<HTMLDivElement> & css95StateProps;

export interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement>, css95StateProps {
  as?: "input" | "textarea" | ComponentType<Record<string, unknown>>;
}

export interface TextAreaBoxProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    css95StateProps {
  as: "textarea";
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement>, css95StateProps {
  listBox?: boolean;
}

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement>, css95StateProps {
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
  vertical?: boolean;
}

export interface ThemeClassicProps extends HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
  screen?: boolean;
}

const stateClassNames = {
  active: "-active",
  down: "-down",
  main: "-main",
  grow: "-grow",
  maximized: "-maximized",
  minimized: "-minimized",
} as const;

function cx(classes: ClassMap | undefined, values: Array<string | false | undefined>, userClass?: string) {
  const resolved: string[] = [];
  for (const value of values) {
    if (!value) continue;
    resolved.push(classes?.[value] ?? value);
  }
  if (userClass) resolved.push(userClass);
  return resolved.join(" ");
}

function states(props: Record<keyof typeof stateClassNames, boolean | undefined>) {
  return Object.entries(stateClassNames).map(([prop, className]) =>
    props[prop as keyof typeof stateClassNames] ? className : undefined,
  );
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
  return jsxs("section", {
    ...props,
    className: cx(classes, ["Window", ...states({ active, down, grow, main, maximized, minimized })], className),
    children: [
      jsxs("div", {
        className: cx(classes, ["WindowTitleBar"]),
        children: [
          icon
            ? jsx("span", {
                className: cx(classes, ["WindowTitleIcon"]),
                children: icon,
              })
            : null,
          jsx("span", {
            className: cx(classes, ["WindowTitleText"]),
            children: title,
          }),
          titleButtons
            ? jsx("div", {
                className: cx(classes, ["WindowTitleButtons"]),
                children: titleButtons,
              })
            : null,
        ],
      }),
      jsx("div", {
        className: cx(classes, ["WindowContent"]),
        children,
      }),
    ],
  });
}

export function Button({
  active,
  children,
  className,
  classes,
  down,
  flat,
  grow,
  main,
  maximized,
  menu,
  minimized,
  title,
  ...props
}: ButtonProps): ReactNode {
  const base = title ? "WindowTitleButton" : menu ? "MenuButton" : flat ? "FlatButton" : "Button";
  return jsx("button", {
    type: "button",
    ...props,
    className: cx(classes, [base, ...states({ active, down, grow, main, maximized, minimized })], className),
    children,
  });
}

export function Field({
  active,
  children,
  className,
  classes,
  down,
  grow,
  main,
  maximized,
  minimized,
  ...props
}: FieldProps): ReactNode {
  return jsx("div", {
    ...props,
    className: cx(classes, ["Field", ...states({ active, down, grow, main, maximized, minimized })], className),
    children,
  });
}

export function TextBox({
  active,
  as: Component = "input",
  className,
  classes,
  down,
  grow,
  main,
  maximized,
  minimized,
  ...props
}: TextBoxProps | TextAreaBoxProps): ReactNode {
  return jsx(Component, {
    ...props,
    className: cx(classes, ["TextBox", ...states({ active, down, grow, main, maximized, minimized })], className),
  });
}

export function Menu({
  active,
  children,
  className,
  classes,
  down,
  grow,
  listBox,
  main,
  maximized,
  minimized,
  ...props
}: MenuProps): ReactNode {
  return jsx("div", {
    ...props,
    className: cx(classes, ["Menu", listBox && "-listBox", ...states({ active, down, grow, main, maximized, minimized })], className),
    children,
  });
}

export function MenuItem({
  active,
  children,
  className,
  classes,
  disabled,
  down,
  grow,
  icon,
  main,
  maximized,
  minimized,
  ...props
}: MenuItemProps): ReactNode {
  return jsxs("div", {
    role: "menuitem",
    ...props,
    className: cx(classes, ["MenuItem", disabled && "-disabled", ...states({ active, down, grow, main, maximized, minimized })], className),
    children: [
      icon ? jsx("span", { className: cx(classes, ["MenuIcon"]), children: icon }) : null,
      jsx("span", { className: cx(classes, ["MenuLabel"]), children }),
    ],
  });
}

export function Separator({ className, classes, vertical, ...props }: SeparatorProps): ReactNode {
  return jsx("div", {
    role: "separator",
    ...props,
    className: cx(classes, ["Separator", vertical && "-vertical"], className),
  });
}

export function ThemeClassic({
  children,
  className,
  classes,
  screen,
  ...props
}: ThemeClassicProps): ReactNode {
  return jsx("div", {
    ...props,
    className: cx(classes, ["ThemeClassic", screen && "Screen"], className),
    children,
  });
}
