// Generates app icons from public/claude-color.png:
//  - app/icon.png        (512, rounded, dark themed background)
//  - app/apple-icon.png  (180, square fill — iOS masks corners)
//  - app/favicon.ico     (16/32/48 multi-size)
const sharp = require("sharp");
const pngToIco = require("png-to-ico").default;
const fs = require("fs/promises");

const SRC = "public/claude-color.png";
const BG = { r: 0x19, g: 0x18, b: 0x1a, alpha: 1 };

async function compose(size, radiusRatio) {
  const pad = Math.round(size * 0.14);
  const inner = size - pad * 2;
  const star = await sharp(SRC)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const base = await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: star, top: pad, left: pad }])
    .png()
    .toBuffer();

  if (!radiusRatio) return base;

  const r = Math.round(size * radiusRatio);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`,
  );
  return sharp(base).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

(async () => {
  // App icon (browser tab) — softly rounded
  await fs.writeFile("app/icon.png", await compose(512, 0.18));
  // Apple touch icon — square, iOS applies its own mask
  await fs.writeFile("app/apple-icon.png", await compose(180, 0));
  // Classic favicon.ico from rounded PNG renditions
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => compose(s, 0.18)));
  await fs.writeFile("app/favicon.ico", await pngToIco(pngs));
  console.log("Icons generated: app/icon.png, app/apple-icon.png, app/favicon.ico");
})();
