const { chromium } = require('playwright');
const fs = require('node:fs');

(async () => {
  fs.mkdirSync('docs/x4-qa', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const file of ['index.html', 'detonado-x4.html']) {
      await page.goto(`http://127.0.0.1:8000/${file}`, { waitUntil: 'networkidle' });
      await page.locator(file === 'index.html' ? '#maverick-x4-carousel' : '#web-spider').scrollIntoViewIfNeeded();
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        broken: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src),
        cards: document.querySelectorAll('#maverick-x4-carousel .file-item').length,
        stages: document.querySelectorAll('.x4-stage').length,
        doubleInCarousel: Boolean(document.querySelector('#maverick-x4-carousel img[alt="Double"]'))
      }));
      console.log(width, file, JSON.stringify(state));
      if (state.overflow || state.broken.length || state.doubleInCarousel) throw new Error('Layout, image, or catalog validation failed');
      if (file === 'index.html') {
        if (state.cards !== 8) throw new Error('X4 carousel must contain eight Mavericks');
        await page.locator('[data-carousel-target="maverick-x4-carousel"][data-carousel-direction="next"]').click();
        await page.waitForTimeout(500);
        if (await page.locator('#maverick-x4-carousel').evaluate(element => element.scrollLeft) <= 0) throw new Error('X4 carousel did not move');
      } else {
        if (state.stages !== 8) throw new Error('X4 walkthrough must contain eight stages');
        const trigger = page.locator('#web-spider .boss-img-wrap');
        await trigger.press('Enter');
        if (await trigger.getAttribute('aria-expanded') !== 'true') throw new Error('Boss details did not expand');
      }
      await page.screenshot({ path: `docs/x4-qa/${file}-${width}.png` });
    }
  }
  await browser.close();
  if (pageErrors.length) throw new Error(pageErrors.join('\n'));
  console.log('PASS: X4 assets, catalog, walkthrough and responsive layouts.');
})().catch(error => { console.error(error); process.exit(1); });
