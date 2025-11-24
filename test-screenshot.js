const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:4200');
  await page.waitForTimeout(2000); // Wait for fractal to render

  await page.screenshot({ path: 'fractal-screenshot.png' });

  console.log('Screenshot saved to fractal-screenshot.png');

  await browser.close();
})();
