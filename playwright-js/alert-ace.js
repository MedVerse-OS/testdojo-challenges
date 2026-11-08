/**
 * Alert Ace (Easy) · Browser › Alerts
 *
 * 1. JS Alert: click Trigger Alert and accept the alert.
 * 2. JS Confirm: click Trigger Confirm and dismiss it (Cancel).
 * 3. JS Prompt: click Trigger Prompt, type Ravi Kumar and accept.
 * 4. Delayed Alert: click the button, wait for the alert to appear
 *    (use a wait, not a fixed sleep), then accept it.
 */
const { chromium } = require('playwright');

(async () => {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/browser/alerts`);

  // TODO: handle the four dialogs.

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
