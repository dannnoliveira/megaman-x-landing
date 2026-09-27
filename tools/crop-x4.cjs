const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

const source = process.argv[2];
const out = path.join(__dirname, '../assets/img/x4/bosses');
const names = [
  'web-spider', 'magma-dragoon', 'frost-walrus',
  'cyber-peacock', 'double', 'slash-beast',
  'split-mushroom', 'storm-owl', 'jet-stingray'
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const meta = await sharp(source).metadata();
  for (let index = 0; index < names.length; index += 1) {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const left = Math.round(column * meta.width / 3) + 2;
    const top = Math.round(row * meta.height / 3) + 2;
    const width = Math.round((column + 1) * meta.width / 3) - left - 2;
    const height = Math.round((row + 1) * meta.height / 3) - top - 2;
    await sharp(source)
      .extract({ left, top, width, height })
      .resize(440, 385, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(out, `${names[index]}.png`));
  }
  console.log('Cropped nine Mega Man X4 portraits.');
})().catch(error => { console.error(error); process.exit(1); });
