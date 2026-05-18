import sharp from "sharp";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const svg = readFileSync(resolve(root, "public", "icon.svg"), "utf-8");

const sizes = [
  { name: "icon-192", size: 192 },
  { name: "icon-512", size: 512 },
  { name: "apple-icon-180", size: 180 },
];

const outDir = resolve(root, "public", "icons");
mkdirSync(outDir, { recursive: true });

for (const { name, size } of sizes) {
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  const outPath = resolve(outDir, `${name}.png`);
  writeFileSync(outPath, buf);
  console.log(`✓ ${name}.png (${size}x${size})`);
}
