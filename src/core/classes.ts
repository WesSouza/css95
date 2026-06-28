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

const stateClassNames = {
  active: "-active",
  down: "-down",
  main: "-main",
  grow: "-grow",
  maximized: "-maximized",
  minimized: "-minimized",
} as const;

type StateValues = Record<keyof typeof stateClassNames, boolean | undefined>;

export function cx(
  classes: ClassMap | undefined,
  values: Array<string | false | undefined>,
  userClass?: string,
) {
  const resolved: string[] = [];
  for (const value of values) {
    if (!value) continue;
    resolved.push(classes?.[value] ?? value);
  }
  if (userClass) resolved.push(userClass);
  return resolved.join(" ");
}

export function states(props: css95StateProps | StateValues) {
  return Object.entries(stateClassNames).flatMap(([prop, className]) =>
    props[prop as keyof typeof stateClassNames] ? [className] : [],
  );
}

export const stateKeys = new Set([
  "active",
  "classes",
  "down",
  "grow",
  "main",
  "maximized",
  "minimized",
]);
