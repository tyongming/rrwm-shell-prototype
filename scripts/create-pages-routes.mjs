import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../docs/", import.meta.url));
const sourceIndex = fileURLToPath(new URL("../docs/index.html", import.meta.url));

for (const route of ["products-services", "about-us", "contact"]) {
  const routeDirectory = `${outputDirectory}${route}`;
  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(sourceIndex, `${routeDirectory}/index.html`);
}

copyFileSync(sourceIndex, `${outputDirectory}404.html`);
