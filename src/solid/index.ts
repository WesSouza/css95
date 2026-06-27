import type { JSX } from "solid-js";
import h from "solid-js/h";

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

export interface WindowProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "title">, css95StateProps {
  title?: JSX.Element;
  icon?: JSX.Element;
  titleButtons?: JSX.Element;
}

export interface ButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "title">, css95StateProps {
  flat?: boolean;
  menu?: boolean;
  title?: boolean;
}

export type FieldProps = JSX.HTMLAttributes<HTMLDivElement> & css95StateProps;

export interface TextBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement>, css95StateProps {
  as?: "input" | "textarea" | ((props: Record<string, unknown>) => JSX.Element);
}

export interface MenuProps extends JSX.HTMLAttributes<HTMLDivElement>, css95StateProps {
  listBox?: boolean;
}

export interface MenuItemProps extends JSX.HTMLAttributes<HTMLDivElement>, css95StateProps {
  disabled?: boolean;
  icon?: JSX.Element;
}

export interface SeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
  vertical?: boolean;
}

export interface ThemeClassicProps extends JSX.HTMLAttributes<HTMLDivElement> {
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

function states(props: css95StateProps) {
  return Object.entries(stateClassNames).map(([prop, className]) =>
    props[prop as keyof typeof stateClassNames] ? className : undefined,
  );
}

function omit(source: object, keys: Set<string>) {
  const record = source as Record<string, unknown>;
  const output: Record<string, unknown> = {};
  for (const key of Object.keys(record)) {
    if (!keys.has(key)) output[key] = record[key];
  }
  return output;
}

function element(value: unknown): JSX.Element {
  return value as JSX.Element;
}

const stateKeys = new Set([
  "active",
  "classes",
  "down",
  "grow",
  "main",
  "maximized",
  "minimized",
]);

export function Window(props: WindowProps): JSX.Element {
  const rest = omit(props, new Set([...stateKeys, "children", "class", "icon", "title", "titleButtons"]));
  return element(h("section", {
    ...rest,
    class: cx(props.classes, ["Window", ...states(props)], props.class),
  }, [
    h("div", { class: cx(props.classes, ["WindowTitleBar"]) }, [
      props.icon ? h("span", { class: cx(props.classes, ["WindowTitleIcon"]) }, props.icon) : null,
      h("span", { class: cx(props.classes, ["WindowTitleText"]) }, props.title),
      props.titleButtons
        ? h("div", { class: cx(props.classes, ["WindowTitleButtons"]) }, props.titleButtons)
        : null,
    ]),
    h("div", { class: cx(props.classes, ["WindowContent"]) }, props.children),
  ]));
}

export function Button(props: ButtonProps): JSX.Element {
  const rest = omit(props, new Set([...stateKeys, "children", "class", "flat", "menu", "title"]));
  const base = props.title ? "WindowTitleButton" : props.menu ? "MenuButton" : props.flat ? "FlatButton" : "Button";
  return element(h("button", {
    type: "button",
    ...rest,
    class: cx(props.classes, [base, ...states(props)], props.class),
  }, props.children));
}

export function Field(props: FieldProps): JSX.Element {
  const rest = omit(props, new Set([...stateKeys, "children", "class"]));
  return element(h("div", {
    ...rest,
    class: cx(props.classes, ["Field", ...states(props)], props.class),
  }, props.children));
}

export function TextBox(props: TextBoxProps): JSX.Element {
  const Component = props.as ?? "input";
  const rest = omit(props, new Set([...stateKeys, "as", "class"]));
  return element(h(Component, {
    ...rest,
    class: cx(props.classes, ["TextBox", ...states(props)], props.class),
  }));
}

export function Menu(props: MenuProps): JSX.Element {
  const rest = omit(props, new Set([...stateKeys, "children", "class", "listBox"]));
  return element(h("div", {
    ...rest,
    class: cx(props.classes, ["Menu", props.listBox && "-listBox", ...states(props)], props.class),
  }, props.children));
}

export function MenuItem(props: MenuItemProps): JSX.Element {
  const rest = omit(props, new Set([...stateKeys, "children", "class", "disabled", "icon"]));
  return element(h("div", {
    role: "menuitem",
    ...rest,
    class: cx(props.classes, ["MenuItem", props.disabled && "-disabled", ...states(props)], props.class),
  }, [
    props.icon ? h("span", { class: cx(props.classes, ["MenuIcon"]) }, props.icon) : null,
    h("span", { class: cx(props.classes, ["MenuLabel"]) }, props.children),
  ]));
}

export function Separator(props: SeparatorProps): JSX.Element {
  const rest = omit(props, new Set(["class", "classes", "vertical"]));
  return element(h("div", {
    role: "separator",
    ...rest,
    class: cx(props.classes, ["Separator", props.vertical && "-vertical"], props.class),
  }));
}

export function ThemeClassic(props: ThemeClassicProps): JSX.Element {
  const rest = omit(props, new Set(["children", "class", "classes", "screen"]));
  return element(h("div", {
    ...rest,
    class: cx(props.classes, ["ThemeClassic", props.screen && "Screen"], props.class),
  }, props.children));
}
