/**
 * Locked Out (Hard) · Flows › Login
 *
 * 1. Sign in with demo@test.com and the wrong password Guess123, three times.
 *    The form locks.
 * 2. Print the lockout message.
 * 3. Wait for the lockout to end (about 10 seconds): wait until Sign In is
 *    enabled again rather than sleeping for a fixed time.
 * 4. Sign in with demo@test.com / Test1234 and wait for the dashboard.
 */
const { chromium } = require('playwright');

(async () => {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/flows/login`);

  // TODO: trigger the lockout, print its message, wait it out, then sign in.
  // Print with: console.log(text);

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
