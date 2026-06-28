import { spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import postcssImport from "postcss-import";
import selectorParser from "postcss-selector-parser";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "src");
const dist = resolve(root, "dist");
const themeNotice = `/*
Theme palettes adapted from React95.
React95 is MIT licensed: Copyright (c) 2019 Artur Bień.
https://github.com/react95-io/React95/tree/master/src/common/themes
*/

`;

async function bundleCss(file) {
  const css = await readFile(file, "utf8");
  const result = await postcss([postcssImport()]).process(css, {
    from: file,
    map: false,
  });
  return result.root;
}

function extractClassNames(root) {
  const names = new Set();

  root.walkRules((rule) => {
    selectorParser((selectors) => {
      selectors.walkClasses((classNode) => {
        names.add(classNode.value);
      });
    }).processSync(rule.selector);
  });

  return [...names].sort((a, b) => a.localeCompare(b));
}

function buildClassesJs(classNames) {
  const entries = classNames
    .map((name) => `  ${JSON.stringify(name)}: ${JSON.stringify(name)}`)
    .join(",\n");
  return `export const classes = Object.freeze({\n${entries}\n});\n\nexport default classes;\n`;
}

function buildClassesDts(classNames) {
  const union = classNames.map((name) => JSON.stringify(name)).join(" | ");
  return `export type ClassName = ${union};\n\nexport declare const classes: Readonly<Record<ClassName, string>>;\nexport default classes;\n`;
}

function extractTokens(root) {
  const tokens = postcss.root();
  root.walkRules((rule) => {
    if (rule.selector !== ":root" && !/^\.Theme[A-Z]/.test(rule.selector))
      return;

    const clone = rule.clone();
    clone.removeAll();
    rule.walkDecls(/^--css95-/, (declaration) => {
      clone.append(declaration.clone());
    });
    if (clone.nodes.length > 0) {
      tokens.append(clone);
    }
  });
  return tokens.toString();
}

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      shell: process.platform === "win32",
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolveRun();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

await rm(dist, { force: true, recursive: true });
await mkdir(dist, { recursive: true });

const bundledCssRoot = await bundleCss(resolve(src, "style.css"));
const bundledCss = bundledCssRoot.toString();
const classNames = extractClassNames(bundledCssRoot);

await writeFile(resolve(dist, "style.css"), `${themeNotice}${bundledCss}`);
await writeFile(
  resolve(dist, "style.module.css"),
  `${themeNotice}${bundledCss}`,
);
await writeFile(
  resolve(dist, "tokens.css"),
  `${themeNotice}${extractTokens(bundledCssRoot)}\n`,
);

await run("pnpm", ["exec", "tsc", "--project", "tsconfig.json"]);

await writeFile(resolve(dist, "classes.js"), buildClassesJs(classNames));
await writeFile(resolve(dist, "classes.d.ts"), buildClassesDts(classNames));
