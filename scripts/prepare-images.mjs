import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const logoSource =
  "C:\\Users\\medom\\.cursor\\projects\\empty-window\\assets\\s11-02_at_7.23.28_PM-50e0aa4b-7657-4621-b14d-0d433405e900.png";

const groups = [
  {
    photo: "photo-1600210492486-724fe5c67fb0",
    outputs: [{ file: "public/images/hero/hero.webp", width: 1920, height: 1200 }],
  },
  {
    photo: "photo-1600585154340-be6161a56a0c",
    outputs: [{ file: "public/images/about/main.webp", width: 1400, height: 1680 }],
  },
  {
    photo: "photo-1615873968403-89e068629265",
    outputs: [{ file: "public/images/about/detail.webp", width: 1000, height: 760 }],
  },
  {
    photo: "photo-1600607687939-ce8a6c25118c",
    outputs: [{ file: "public/images/philosophy/space.webp", width: 1400, height: 1680 }],
  },
  project("warm-space", [
    "photo-1618221195710-dd6b41faaea6",
    "photo-1600121848594-d8644e57abab",
    "photo-1618220179428-22790b461013",
    "photo-1586023492125-27b2c045efd7",
  ]),
  project("contemporary-details", [
    "photo-1600566753190-17f0baa2a6c3",
    "photo-1600585154526-990dced4db0d",
    "photo-1600489000022-c2086d79f9d4",
    "photo-1600566753086-00f18fb6b3ea",
  ]),
  project("material-balance", [
    "photo-1615529328331-f8917597711f",
    "photo-1554995207-c18c203602cb",
    "photo-1616486338812-3dadae4b4ace",
    "photo-1600210492493-0946911123ea",
  ]),
  project("visual-calm", [
    "photo-1616594039964-ae9021a400a0",
    "photo-1505691938895-1758d7feb511",
    "photo-1595526114035-0d45ed16cfbf",
    "photo-1493809842364-78817add7ffb",
  ]),
  project("natural-home", [
    "photo-1600585152220-90363fe7e115",
    "photo-1560448204-e02f11c3d0e2",
    "photo-1600210491369-e753d80a41f3",
    "photo-1556912173-46c336c7fd55",
  ]),
  project("architectural-lines", [
    "photo-1600607688969-a5bfcd646154",
    "photo-1600607687920-4e2a09cf159d",
    "photo-1600047509358-9dc75507daeb",
    "photo-1512917774080-9991f1c4c750",
  ]),
].flat();

function project(slug, photos) {
  return photos.map((photo, index) => {
    const name = String(index + 1).padStart(2, "0");
    const outputs = [
      {
        file: `public/images/projects/${slug}/${name}.webp`,
        width: 1600,
        height: 1100,
      },
      {
        file: `public/images/projects/${slug}/${name}-thumb.webp`,
        width: 480,
        height: 330,
      },
    ];
    if (index === 0) {
      outputs.push({
        file: `public/images/projects/${slug}/cover.webp`,
        width: 1400,
        height: 960,
      });
    }
    return { photo, outputs };
  });
}

const cache = new Map();

async function download(photo) {
  if (cache.has(photo)) return cache.get(photo);
  const pending = (async () => {
    const url = `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=2200&q=82`;
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        Accept: "image/avif,image/webp,image/jpeg,image/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (compatible; ORIGINAL-image-prep/1.0)",
      },
    });
    if (!response.ok) {
      throw new Error(`Image download failed (${response.status}) for ${photo}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 20000) {
      throw new Error(`Image download looked empty for ${photo} (${buffer.length} bytes)`);
    }
    return buffer;
  })();
  cache.set(photo, pending);
  return pending;
}

async function fileReady(file) {
  try {
    const info = await stat(file);
    return info.size > 1000;
  } catch {
    return false;
  }
}

async function writeOutput(buffer, output) {
  const destination = path.join(root, output.file);
  if (await fileReady(destination)) {
    console.log(`skip ${output.file}`);
    return;
  }
  await mkdir(path.dirname(destination), { recursive: true });
  await sharp(buffer)
    .rotate()
    .resize(output.width, output.height, { fit: "cover", position: "centre" })
    .webp({ quality: 76 })
    .toFile(destination);
  console.log(output.file);
}

async function mapPool(items, limit, worker) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (!item) return;
        await worker(item);
      }
    }),
  );
}

await mkdir(path.join(root, "public/images"), { recursive: true });
await mkdir(path.join(root, "public/brand"), { recursive: true });

await sharp({
  create: {
    width: 1600,
    height: 1100,
    channels: 3,
    background: "#D8C4B6",
  },
})
  .webp({ quality: 60 })
  .toFile(path.join(root, "public/images/fallback.webp"));

await sharp(logoSource)
  .resize(512, 512, { fit: "cover" })
  .png()
  .toFile(path.join(root, "public/brand/seal.png"));

await sharp(logoSource)
  .resize(192, 192, { fit: "cover" })
  .png()
  .toFile(path.join(root, "src/app/icon.png"));

await mapPool(groups, 4, async (group) => {
  const buffer = await download(group.photo);
  for (const output of group.outputs) {
    await writeOutput(buffer, output);
  }
});

console.log("Images ready.");
