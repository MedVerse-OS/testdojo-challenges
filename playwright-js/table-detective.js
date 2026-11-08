/**
 * Table Detective (Medium) · Advanced › Tables
 *
 * 1. Paginate Table: page through the whole table and find the Designer with
 *    the highest score. Print their name and score, e.g. Top designer: Name (90).
 * 2. Leave the paginated table on the page that shows that person.
 * 3. Sort by Column: sort the table by Score, highest first.
 * 4. Filter Table Rows: filter the names by Shah.
 */
const { chromium } = require('playwright');

(async () => {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/advanced/tables`);

  // TODO: find the top Designer, then sort and filter the other tables.
  // Print with: console.log(text);

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
