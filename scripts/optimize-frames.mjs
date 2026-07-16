/**
 * One-time pipeline: converts the raw JPG animation frames into two optimized
 * WebP sets (desktop + mobile) under public/frames/, plus a manifest consumed
 * by the hero component.
 *
 * Usage: npm run frames
 */
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.resolve("FRAME OF CAT ANIMATION");
const OUT_ROOT = path.resolve("public/frames");
const MANIFEST = path.resolve("src/lib/frames.json");

// Keep every 2nd frame — indistinguishable when scrubbed by scroll,
// halves the download.
const DECIMATE = 2;

const VARIANTS = [
  { name: "lg", width: 1440, quality: 68 },
  { name: "sm", width: 828, quality: 65 },
];

const CONCURRENCY = 8;

async function main() {
  const all = (await readdir(SRC_DIR))
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort();
  const kept = all.filter((_, i) => i % DECIMATE === 0);
  console.log(`Source frames: ${all.length}, keeping every ${DECIMATE}nd → ${kept.length}`);

  for (const v of VARIANTS) {
    await mkdir(path.join(OUT_ROOT, v.name), { recursive: true });
  }

  const jobs = [];
  kept.forEach((file, index) => {
    const outName = `frame-${String(index + 1).padStart(3, "0")}.webp`;
    for (const v of VARIANTS) {
      jobs.push(async () => {
        await sharp(path.join(SRC_DIR, file))
          .resize({ width: v.width })
          .webp({ quality: v.quality, effort: 5 })
          .toFile(path.join(OUT_ROOT, v.name, outName));
      });
    }
  });

  let done = 0;
  async function worker() {
    while (jobs.length) {
      const job = jobs.shift();
      await job();
      done++;
      if (done % 50 === 0) console.log(`  ${done} files written…`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Report sizes per variant
  const report = {};
  for (const v of VARIANTS) {
    const dir = path.join(OUT_ROOT, v.name);
    const files = await readdir(dir);
    let bytes = 0;
    for (const f of files) bytes += (await stat(path.join(dir, f))).size;
    report[v.name] = { files: files.length, mb: +(bytes / 1024 / 1024).toFixed(2) };
  }

  const manifest = {
    count: kept.length,
    pad: 3,
    basePath: "/frames",
    variants: VARIANTS.map((v) => ({ name: v.name, width: v.width })),
  };
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  console.log("Done:", JSON.stringify(report));
  console.log(`Manifest written to ${MANIFEST}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
