/**
 * Gatekeeper (Medium) · Flows › Login
 *
 * Try three sign-ins that must fail, in this order, and print the error
 * message the page shows for each. Then sign in for real.
 *
 * 1. Email demo@test, password Test1234      -> print the email error.
 * 2. Email demo@test.com, no password         -> print the password error.
 * 3. Email demo@test.com, password Wrong123   -> print the message above the form.
 * 4. Sign in with demo@test.com / Test1234 and wait for the dashboard.
 *
 * Clear the fields between attempts.
 */
import { chromium, type Page } from 'playwright';

async function main(): Promise<void> {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page: Page = context.pages()[0] ?? (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/flows/login`);

  // TODO: try the three failing sign-ins, print each error, then sign in.
  // Print with: console.log(text);

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
