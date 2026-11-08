/**
 * Registration Rookie (Easy) · Elements › Forms
 *
 * 1. Fill the registration form:
 *      Full name      Asha Verma
 *      Email          asha.verma@example.com
 *      Phone          9876543210
 *      Date of birth  21 April 1998
 *      Password       any, at least 6 characters, confirmed
 * 2. Submit the form and wait for the success message.
 * 3. In the Autosuggest field, type "Ind" and choose "India" from the suggestions.
 */
const { chromium } = require('playwright');

(async () => {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/elements/forms.html`);

  // TODO: fill the form, submit it, then pick India from the autosuggest.

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
