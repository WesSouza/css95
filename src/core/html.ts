export type ClassMap = Record<string, string | undefined>;
export type ElementName = keyof HTMLElementTagNameMap;
export type MultipleAppearance<Appearance extends string> =
  | Appearance
  | Appearance[];

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
  return resolved.join(' ');
}

export function multipleAppearanceClasses<Appearance extends string>(
  appearance: MultipleAppearance<Appearance> | undefined,
) {
  const appearances = Array.isArray(appearance)
    ? appearance
    : appearance
      ? [appearance]
      : [];
  return appearances.map((value) => `-${value}`);
}
