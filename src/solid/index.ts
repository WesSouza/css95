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

export interface ThemeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
  screen?: boolean;
}

export type ThemeClassicProps = ThemeProps;

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

function createThemeComponent(themeClassName: string) {
  return function ThemeComponent(props: ThemeProps): JSX.Element {
    const rest = omit(props, new Set(["children", "class", "classes", "screen"]));
    return element(h("div", {
      ...rest,
      class: cx(props.classes, [themeClassName, props.screen && "Screen"], props.class),
    }, props.children));
  };
}

export const ThemeClassic = createThemeComponent("ThemeClassic");
export const ThemeAiee = createThemeComponent("ThemeAiee");
export const ThemeAsh = createThemeComponent("ThemeAsh");
export const ThemeAzureOrange = createThemeComponent("ThemeAzureOrange");
export const ThemeBee = createThemeComponent("ThemeBee");
export const ThemeBlackAndWhite = createThemeComponent("ThemeBlackAndWhite");
export const ThemeBlue = createThemeComponent("ThemeBlue");
export const ThemeBrick = createThemeComponent("ThemeBrick");
export const ThemeCandy = createThemeComponent("ThemeCandy");
export const ThemeCherry = createThemeComponent("ThemeCherry");
export const ThemeColdGray = createThemeComponent("ThemeColdGray");
export const ThemeCounterStrike = createThemeComponent("ThemeCounterStrike");
export const ThemeDarkTeal = createThemeComponent("ThemeDarkTeal");
export const ThemeDenim = createThemeComponent("ThemeDenim");
export const ThemeEggplant = createThemeComponent("ThemeEggplant");
export const ThemeFxDev = createThemeComponent("ThemeFxDev");
export const ThemeHighContrast = createThemeComponent("ThemeHighContrast");
export const ThemeHoney = createThemeComponent("ThemeHoney");
export const ThemeHotChocolate = createThemeComponent("ThemeHotChocolate");
export const ThemeHotdogStand = createThemeComponent("ThemeHotdogStand");
export const ThemeLilac = createThemeComponent("ThemeLilac");
export const ThemeLilacRoseDark = createThemeComponent("ThemeLilacRoseDark");
export const ThemeMaple = createThemeComponent("ThemeMaple");
export const ThemeMarine = createThemeComponent("ThemeMarine");
export const ThemeMatrix = createThemeComponent("ThemeMatrix");
export const ThemeMillenium = createThemeComponent("ThemeMillenium");
export const ThemeModernDark = createThemeComponent("ThemeModernDark");
export const ThemeMolecule = createThemeComponent("ThemeMolecule");
export const ThemeNinjaTurtles = createThemeComponent("ThemeNinjaTurtles");
export const ThemeOlive = createThemeComponent("ThemeOlive");
export const ThemeOriginal = createThemeComponent("ThemeOriginal");
export const ThemePamelaAnderson = createThemeComponent("ThemePamelaAnderson");
export const ThemePeggysPastels = createThemeComponent("ThemePeggysPastels");
export const ThemePlum = createThemeComponent("ThemePlum");
export const ThemePolarized = createThemeComponent("ThemePolarized");
export const ThemePowerShell = createThemeComponent("ThemePowerShell");
export const ThemeRainyDay = createThemeComponent("ThemeRainyDay");
export const ThemeRaspberry = createThemeComponent("ThemeRaspberry");
export const ThemeRedWine = createThemeComponent("ThemeRedWine");
export const ThemeRose = createThemeComponent("ThemeRose");
export const ThemeSeawater = createThemeComponent("ThemeSeawater");
export const ThemeShelbiTeal = createThemeComponent("ThemeShelbiTeal");
export const ThemeSlate = createThemeComponent("ThemeSlate");
export const ThemeSolarizedDark = createThemeComponent("ThemeSolarizedDark");
export const ThemeSolarizedLight = createThemeComponent("ThemeSolarizedLight");
export const ThemeSpruce = createThemeComponent("ThemeSpruce");
export const ThemeStormClouds = createThemeComponent("ThemeStormClouds");
export const ThemeTheSixtiesUSA = createThemeComponent("ThemeTheSixtiesUSA");
export const ThemeTokyoDark = createThemeComponent("ThemeTokyoDark");
export const ThemeToner = createThemeComponent("ThemeToner");
export const ThemeTooSexy = createThemeComponent("ThemeTooSexy");
export const ThemeTravel = createThemeComponent("ThemeTravel");
export const ThemeVaporTeal = createThemeComponent("ThemeVaporTeal");
export const ThemeVermillion = createThemeComponent("ThemeVermillion");
export const ThemeVioletDark = createThemeComponent("ThemeVioletDark");
export const ThemeVistaesqueMidnight = createThemeComponent("ThemeVistaesqueMidnight");
export const ThemeWater = createThemeComponent("ThemeWater");
export const ThemeWhite = createThemeComponent("ThemeWhite");
export const ThemeWindows1 = createThemeComponent("ThemeWindows1");
export const ThemeWmii = createThemeComponent("ThemeWmii");
