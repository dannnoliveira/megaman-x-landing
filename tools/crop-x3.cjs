const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
const source = process.argv[2];
const out = path.join(__dirname, '../assets/img/x3/bosses');
const names = ['blast-hornet', 'neon-tiger', 'tunnel-rhino', 'gravity-beetle', 'dr-doppler', 'volt-catfish', 'crush-crawfish', 'toxic-seahorse', 'blizzard-buffalo'];
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const meta = await sharp(source).metadata();
  for (let i = 0; i < names.length; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const left = Math.round(col * meta.width / 3) + 2;
    const top = Math.round(row * meta.height / 3) + 2;
    const width = Math.round((col + 1) * meta.width / 3) - left - 2;
    const height = Math.round((row + 1) * meta.height / 3) - top - 2;
    await sharp(source).extract({ left, top, width, height }).resize(442, 386, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(out, names[i] + '.png'));
  }
  console.log('Cropped nine alpha PNG portraits.');
})().catch(error => { console.error(error); process.exit(1); });
