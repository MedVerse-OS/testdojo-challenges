/**
 * Shadow Walker (Medium) · Advanced › Shadow DOM
 *
 * 1. Open Shadow Root: click the button inside the shadow root.
 * 2. Nested Shadow Roots: click the button in the inner shadow root
 *    (a shadow root inside another one).
 * 3. Shadow DOM Form Input: type No shadow can hide from me
 *
 * Leave the Closed Shadow Root alone: nothing can reach inside it.
 */
import { chromium, type Page } from 'playwright';

async function main(): Promise<void> {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page: Page = context.pages()[0] ?? (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/advanced/shadow-dom`);

  // TODO: reach into the shadow roots.

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
