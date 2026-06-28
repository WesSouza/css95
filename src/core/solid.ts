import type { JSX } from "solid-js";

export function omit(source: object, keys: Set<string>) {
  const record = source as Record<string, unknown>;
  const output: Record<string, unknown> = {};
  for (const key of Object.keys(record)) {
    if (!keys.has(key)) output[key] = record[key];
  }
  return output;
}

export function element(value: unknown): JSX.Element {
  return value as JSX.Element;
}
