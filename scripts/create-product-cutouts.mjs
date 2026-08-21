import sharp from "sharp";

const products = ["fossibot-f1200", "fossibot-f1800", "fossibot-f2400"];

for (const product of products) {
  const input = `public/images/products/${product}/hero.webp`;
  const output = `public/images/products/${product}/cutout.png`;
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const visited = new Uint8Array(info.width * info.height);
  const queue = new Int32Array(info.width * info.height);
  let head = 0;
  let tail = 0;

  const isBackground = (pixel) => {
    const offset = pixel * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    return Math.min(r, g, b) > 205 && Math.max(r, g, b) - Math.min(r, g, b) < 28;
  };

  const enqueue = (pixel) => {
    if (!visited[pixel] && isBackground(pixel)) {
      visited[pixel] = 1;
      queue[tail++] = pixel;
    }
  };

  for (let x = 0; x < info.width; x++) {
    enqueue(x);
    enqueue((info.height - 1) * info.width + x);
  }
  for (let y = 0; y < info.height; y++) {
    enqueue(y * info.width);
    enqueue(y * info.width + info.width - 1);
  }

  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % info.width;
    const y = Math.floor(pixel / info.width);
    if (x > 0) enqueue(pixel - 1);
    if (x + 1 < info.width) enqueue(pixel + 1);
    if (y > 0) enqueue(pixel - info.width);
    if (y + 1 < info.height) enqueue(pixel + info.width);
  }

  for (let pixel = 0; pixel < visited.length; pixel++) {
    if (!visited[pixel]) continue;
    const offset = pixel * 4;
    const lightness = Math.min(data[offset], data[offset + 1], data[offset + 2]);
    data[offset + 3] = Math.max(0, Math.min(255, Math.round((250 - lightness) * 5.67)));
  }

  await sharp(data, { raw: info }).png().toFile(output);
}
