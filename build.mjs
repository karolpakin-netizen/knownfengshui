import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const projectRoot = resolve(scriptDir, "..");
const distDir = join(projectRoot, "dist");
const tailwindCli = join(projectRoot, "node_modules", "tailwindcss", "lib", "cli.js");

const cssBuild = spawnSync(
  process.execPath,
  [tailwindCli, "-i", join(projectRoot, "src", "input.css"), "-o", join(projectRoot, "assets", "css", "styles.css"), "--minify"],
  { stdio: "inherit" }
);

if (cssBuild.status !== 0) process.exit(cssBuild.status ?? 1);

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

for (const file of readdirSync(projectRoot)) {
  if (file.endsWith(".html")) copyFileSync(join(projectRoot, file), join(distDir, file));
}

cpSync(join(projectRoot, "assets"), join(distDir, "assets"), { recursive: true });
if (existsSync(join(projectRoot, "public"))) cpSync(join(projectRoot, "public"), distDir, { recursive: true });

console.log("Static production files are ready in dist/.");
