/**
 * Tab Tamer (Hard) · Browser › Tabs and Windows
 *
 * 1. Click Open Link in New Tab, switch to the new tab and click its button.
 *    Leave that tab open.
 * 2. Back on the Tabs page, click Open 3 Tabs, then close Tab B only.
 * 3. Go to the Windows page, click Open Window (2s delay), wait for the
 *    window to open and click its button.
 */
const { chromium } = require('playwright');

(async () => {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/browser/tabs`);

  // TODO: work with the new tabs and the delayed window.

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
