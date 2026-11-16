import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(projectRoot, "dist");
const appFiles = ["index.html", "manifest.json", "icon.svg", "sw.js"];

await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  appFiles.map(file => copyFile(join(projectRoot, file), join(outputDirectory, file)))
);

console.log(`Built ${appFiles.length} app files in ${outputDirectory}`);
