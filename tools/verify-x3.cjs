const { chromium } = require('playwright');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 fs.mkdirSync('docs/x3-qa',{recursive:true});
 for(const width of [1440,390]) {
  await page.setViewportSize({width,height:900});
  for(const file of ['index.html','detonado-x3.html']) {
   await page.goto('http://127.0.0.1:8000/'+file);
   await page.locator(file==='index.html'?'#maverick-x3-carousel':'#blizzard-buffalo').scrollIntoViewIfNeeded();
   await page.waitForTimeout(500);
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),stages:document.querySelectorAll('.x3-stage').length,cards:document.querySelectorAll('#maverick-x3-carousel .file-item').length}));
   console.log(width,file,JSON.stringify(state));
   if(state.overflow||state.broken.length) throw new Error('Layout or image failure');
   if(file==='index.html') {
    await page.locator('[data-carousel-target="maverick-x3-carousel"][data-carousel-direction="next"]').click();
    await page.waitForTimeout(700);
    if(await page.locator('#maverick-x3-carousel').evaluate(e=>e.scrollLeft)<=0) throw new Error('Carousel did not move');
   } else {
    const trigger=page.locator('#blizzard-buffalo .boss-img-wrap');
    await trigger.press('Enter');
    if(await trigger.getAttribute('aria-expanded')!=='true') throw new Error('Details did not expand');
   }
   await page.screenshot({path:`docs/x3-qa/${file}-${width}.png`});
   await page.locator('.detonado-menu summary').click();
   if(!await page.locator('.detonado-menu a[href="detonado-x3.html"]').isVisible()) throw new Error('Missing X3 menu');
  }
 }
 await browser.close();
 if(errors.length) throw new Error(errors.join('\n'));
 console.log('PASS: responsive layouts, images, carousel, keyboard details and menu.');
})().catch(e=>{console.error(e);process.exit(1)});
