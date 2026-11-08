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
import { chromium, type Page } from 'playwright';
import { join, resolve } from 'node:path';
import type { Locator } from 'playwright';
import { statSync } from 'node:fs';

// Checks: each of the three upload inputs holds exactly the required fixture files (count, names, and sizes), and each card shows its selection.
async function main(): Promise<void> {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page: Page = context.pages()[0] ?? (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';
  // Folder with the files to upload (the checks provide it).
  const fixtures = resolve(process.env.TESTDOJO_FIXTURES || 'fixtures');

  // ---- Your code ----
  // Local runs only: tools/run-local.mjs sets TRACE_PATH to record a trace. TestDojo never sets it.
  const tracePath = process.env.TRACE_PATH;
  if (tracePath) await context.tracing.start({ screenshots: true, snapshots: true });

  try {
    await page.goto(`${baseUrl}/advanced/upload-download`);

    // Expected names come from the exercise; expected sizes are read from the files on disk now,
    // so the checks hold for TestDojo's real files as well as for our local made-up ones.
    const resumePdf = fixtureFile(fixtures, 'resume.pdf');
    const photoPng = fixtureFile(fixtures, 'photo.png');
    const notesTxt = fixtureFile(fixtures, 'notes.txt');

    const uploadsPage = page.getByRole('main');
    // The two visible inputs and the hidden drop-zone input each carry an aria-label, which is their label.
    const singleInput = uploadsPage.getByLabel('Upload one file', { exact: true });
    const multiInput = uploadsPage.getByLabel('Upload several files', { exact: true });
    const dropZoneInput = uploadsPage.getByLabel('Upload a file to the drop zone', { exact: true });
    // The drop zone is a plain <div> with no role or label, so it is found by its id, which is named for it.
    const dropZone = uploadsPage.locator('#upload-dropzone');
    // Each card's status is a plain <p> with no role or label, and the expected text cannot be the
    // locator (it is what we check), so the status is found by its id, which is named for its card.
    const singleStatus = uploadsPage.locator('#upload-single-status');
    const multiStatus = uploadsPage.locator('#upload-multi-status');
    const dropZoneStatus = uploadsPage.locator('#upload-dropzone-status');

    // Starting state: nothing is selected yet, so every file found later came from our own action.
    await mustHaveText(singleStatus, /^No file selected$/, 'the single upload starts empty');
    await mustHaveText(multiStatus, /^No files selected$/, 'the multiple upload starts empty');
    await mustHaveText(dropZoneStatus, /^No file selected$/, 'the drop zone starts empty');
    await mustHoldFiles(singleInput, [], 'the single upload input starts with no files');
    await mustHoldFiles(multiInput, [], 'the multiple upload input starts with no files');
    await mustHoldFiles(dropZoneInput, [], 'the drop zone input starts with no files');

    // 1. Single upload: hand resume.pdf to the visible file input (no OS file picker opens in automation).
    //    The status is written from the input's own file list, so once it shows, the list is final.
    await singleInput.setInputFiles(join(fixtures, 'resume.pdf'));
    await mustHaveText(singleStatus, /^Selected: resume\.pdf$/, 'the single upload shows resume.pdf');
    await mustHoldFiles(singleInput, [resumePdf], 'the single upload holds exactly resume.pdf');

    // 2. Multiple upload: both files in ONE call. A second setInputFiles call would replace the first
    //    file, not add to it, so "together" means one action with both paths. The status lists the
    //    names in the order we hand them over, so its expected text follows that order.
    await multiInput.setInputFiles([join(fixtures, 'photo.png'), join(fixtures, 'notes.txt')]);
    await mustHaveText(multiStatus, /^2 file\(s\) selected: photo\.png, notes\.txt$/, 'the multiple upload shows both files');
    await mustHoldFiles(multiInput, [photoPng, notesTxt], 'the multiple upload holds exactly photo.png and notes.txt');

    // 3. Drop zone: drop photo.png onto the zone. locator.drop() fires dragenter, dragover, and drop
    //    on the zone with the file, so the page's own drop handler moves it into the hidden input.
    //    Chosen over setInputFiles() on the hidden input, which would skip the drop zone's code.
    //    It is a simulated drop of a file from outside the page, not a mouse drag between elements,
    //    and it throws if the zone does not accept the drop.
    await dropZone.drop({ files: join(fixtures, 'photo.png') });
    await mustHaveText(dropZoneStatus, /^Selected: photo\.png$/, 'the drop zone shows photo.png');
    await mustHoldFiles(dropZoneInput, [photoPng], 'the drop zone holds exactly photo.png');

    // Last: the final state, which is what TestDojo inspects after the script ends. The earlier
    // inputs are checked again so a correct state seen earlier is not taken as proof of the end state.
    await mustHoldFiles(singleInput, [resumePdf], 'the single upload still holds exactly resume.pdf at the end');
    await mustHoldFiles(multiInput, [photoPng, notesTxt], 'the multiple upload still holds exactly photo.png and notes.txt at the end');
  } finally {
    if (tracePath) await context.tracing.stop({ path: tracePath });
  }

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

// ---- Files. What a file input holds, and what it should hold. ----

type HeldFile = { name: string; size: number };

// The expected file: its name, and its size in bytes as it is on disk right now.
// Fails with a clear message when the file is missing or is not a file.
function fixtureFile(folder: string, name: string): HeldFile {
  try {
    const stats = statSync(join(folder, name));
    if (!stats.isFile()) throw new Error('not a file');
    return { name, size: stats.size };
  } catch (error) {
    throw new Error(`Check failed: the fixture file ${name} can be read from ${folder}.`, { cause: error });
  }
}

// Sorted by name, so the comparison does not depend on order (the exercise sets no order).
function byName(files: HeldFile[]): HeldFile[] {
  return [...files].sort((a, b) => a.name.localeCompare(b.name));
}

// Checks that the locator points at exactly one file input, and that the files it holds match the
// expected ones: same count, same names, same sizes. The sizes on the page come from the browser's
// own file list, so they are compared with the files on disk, never with what the page displays.
async function mustHoldFiles(input: Locator, expected: HeldFile[], what: string): Promise<void> {
  let held: HeldFile[];
  try {
    // waitFor is strict: it fails when nothing matches and also when several elements match.
    // "attached", not "visible", because the drop-zone input is hidden on purpose.
    await input.waitFor({ state: 'attached' });
    held = await input.evaluate((element) => {
      if (!(element instanceof HTMLInputElement) || element.type !== 'file') {
        throw new Error(`the target is not a file input: ${element.outerHTML.slice(0, 80)}`);
      }
      return Array.from(element.files ?? [], (file) => ({ name: file.name, size: file.size }));
    });
  } catch (error) {
    throw new Error(`Check failed: ${what}. Could not read the files of exactly one file input.`, { cause: error });
  }
  const want = JSON.stringify(byName(expected));
  const got = JSON.stringify(byName(held));
  if (got !== want) {
    throw new Error(`Check failed: ${what}. Expected ${expected.length} file(s) ${want}, found ${held.length}: ${got}.`);
  }
  console.log(`Checked: ${what} ${got}.`);
}

// ---- Checks. Each one waits for the page, and throws a clear error when it fails. ----

// Checks that the locator points at exactly one visible element, and that its text matches the pattern.
// Anchor the pattern with ^ and $ to compare the whole text.
async function mustHaveText(locator: Locator, pattern: RegExp, what: string): Promise<void> {
  try {
    // 1. Find the target without using the expected text. waitFor is strict, so this fails
    //    when nothing matches and also when several elements match.
    await locator.waitFor({ state: 'visible' });
    // 2. Wait until the text of that element matches.
    await locator.filter({ hasText: pattern }).waitFor({ state: 'visible' });
  } catch (error) {
    const found = await locator.allInnerTexts();
    throw new Error(
      `Check failed: ${what}. Expected one element with text matching ${pattern}, found ${found.length}: ${JSON.stringify(found)}.`,
      { cause: error },
    );
  }
  // 3. Still exactly one element at the end, so no second match appeared while we waited.
  const count = await locator.count();
  if (count !== 1) {
    throw new Error(`Check failed: ${what}. Expected one element, found ${count}.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
