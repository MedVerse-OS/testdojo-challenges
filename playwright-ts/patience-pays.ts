/**
 * Patience Pays (Medium) · Elements › Dynamic
 *
 * Use waits throughout, not fixed sleeps.
 *
 * 1. Delayed Content: click Load Data, wait for the result and print it.
 * 2. Progress Bar: click Start and wait until it says Complete!
 * 3. Live Countdown: click Start Countdown and wait until it says Done!
 * 4. Delayed Enable: wait for Submit to be enabled, then click it once.
 * 5. Unstable ID: click Regenerate ID, then find the element by its
 *    data-testid and print its new id.
 */
import { chromium, type Page } from 'playwright';

async function main(): Promise<void> {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page: Page = context.pages()[0] ?? (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/elements/dynamic`);

  // TODO: wait for each element, then print the loaded text and the new id.
  // Print with: console.log(text);

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
