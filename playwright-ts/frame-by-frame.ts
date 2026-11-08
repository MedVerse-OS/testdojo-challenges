/**
 * Frame by Frame (Medium) · Browser › Frames
 *
 * 1. Single Iframe: click the button inside it.
 * 2. Nested Iframes: click the button in the inner frame (it sits inside the outer frame).
 * 3. Multiple Iframes: click the button in Frame B only.
 * 4. Dynamically Loaded Iframe: click Load Iframe (2s), wait for the frame,
 *    then click the button inside it.
 * 5. Switch back to the main page when you're done.
 */
import { chromium, type Page } from 'playwright';

async function main(): Promise<void> {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page: Page = context.pages()[0] ?? (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/browser/frames`);

  // TODO: click the buttons inside the frames.

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
