import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [input, outputBase] = process.argv.slice(2);

if (!input || !outputBase) {
  console.log(`حوّل صورة JPG أو PNG إلى نسخ WebP التي يستخدمها الموقع:

  npm run convert -- "صورتي.jpg" "public/images/projects/new-villa/01"

ينتج:
  01.webp        عرض حتى 1600
  01-sm.webp     عرض حتى 800، وهذه التي تُحمَّل على الموبايل
  01-thumb.webp  مصغّرة الكاروسيل

الغلاف: نفس الأمر مع cover بدل 01.
غلاف الفيديو: نفس الأمر مع public/videos/projects/new-villa/poster`);
  process.exit(1);
}

const destination = outputBase.replace(/\.webp$/i, "");
const full = `${destination}.webp`;
const small = `${destination}-sm.webp`;
const thumb = `${destination}-thumb.webp`;

await mkdir(path.dirname(path.resolve(full)), { recursive: true });

const source = sharp(input).rotate();

await source
  .clone()
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 76 })
  .toFile(full);

await source
  .clone()
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 64 })
  .toFile(small);

await source
  .clone()
  .resize({ width: 480, withoutEnlargement: true })
  .webp({ quality: 60 })
  .toFile(thumb);

const original = await stat(input);
for (const file of [full, small, thumb]) {
  const info = await stat(file);
  const ratio = Math.round((info.size / original.size) * 100);
  console.log(`${file}  ${kb(info.size)}  (${ratio}% من الأصل ${kb(original.size)})`);
}

function kb(bytes) {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
