/**
 * Upload Ready (Easy) · Advanced › Upload / Download
 *
 * The files are in the folder `fixtures` points to (set up for you below).
 *
 * 1. Upload a Single File: upload resume.pdf.
 * 2. Upload Multiple Files: upload photo.png and notes.txt together.
 * 3. Drag-and-Drop Upload Zone: upload photo.png. Its file input is hidden,
 *    so find a way to hand it the file.
 */
const { chromium } = require('playwright');
const { join, resolve } = require('node:path');

(async () => {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';
  // Folder with the files to upload (the checks provide it).
  const fixtures = resolve(process.env.TESTDOJO_FIXTURES || 'fixtures');

  // ---- Your code ----
  await page.goto(`${baseUrl}/advanced/upload-download`);

  // TODO: upload the three files.

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
