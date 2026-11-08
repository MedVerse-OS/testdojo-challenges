/**
 * Alert Ace (Easy) · Browser › Alerts
 *
 * 1. JS Alert: click Trigger Alert and accept the alert.
 * 2. JS Confirm: click Trigger Confirm and dismiss it (Cancel).
 * 3. JS Prompt: click Trigger Prompt, type Ravi Kumar and accept.
 * 4. Delayed Alert: click the button, wait for the alert to appear
 *    (use a wait, not a fixed sleep), then accept it.
 */
import { chromium, type Page } from 'playwright';
import type { Dialog, Locator } from 'playwright';

// The site opens the delayed alert 2 seconds after the click (setTimeout of 2000 ms in the page source).
// Each dialog may take up to 10 seconds: room for a slow machine, and still a quick failure when none comes.
const DIALOG_TIMEOUT_MS = 10_000;

// Checks: each of the four dialogs is handled as required, proven by its type, its message, and its card's final status.
async function main(): Promise<void> {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page: Page = context.pages()[0] ?? (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  // Local runs only: tools/run-local.mjs sets TRACE_PATH to record a trace. TestDojo never sets it.
  const tracePath = process.env.TRACE_PATH;
  if (tracePath) await context.tracing.start({ screenshots: true, snapshots: true });

  try {
    await page.goto(`${baseUrl}/browser/alerts`);

    // From here on, every dialog on the page goes through this watcher, so none is closed silently.
    const dialogs = watchDialogs(page);

    // Each card's status is a plain <p> with no role or label, and the expected text cannot be the
    // locator (it is what we check), so the status is found by its id, which is named for its card.
    const alertsPage = page.getByRole('main');
    const alertStatus = alertsPage.locator('#alert-basic-status');
    const confirmStatus = alertsPage.locator('#alert-confirm-status');
    const promptStatus = alertsPage.locator('#alert-prompt-status');
    const delayedStatus = alertsPage.locator('#alert-delayed-status');

    // Starting state: no card has been used yet, so each final status below comes from our own action.
    await mustHaveText(alertStatus, /^Not triggered yet$/, 'the JS Alert card starts untouched');
    await mustHaveText(confirmStatus, /^Not triggered yet$/, 'the JS Confirm card starts untouched');
    await mustHaveText(promptStatus, /^Not triggered yet$/, 'the JS Prompt card starts untouched');
    await mustHaveText(delayedStatus, /^Not triggered yet$/, 'the Delayed Alert card starts untouched');

    // 1. JS Alert: accept it. The page writes "Alert accepted" however an alert is closed, so the
    //    status only proves the alert was shown and closed. The proof that it was accepted is
    //    handleDialog: it calls accept() only on an alert with this exact message.
    await dialogs.handleDialog(
      { type: 'alert', message: 'This is a simple alert!', answer: (dialog) => dialog.accept() },
      () => alertsPage.getByRole('button', { name: 'Trigger Alert', exact: true }).click(),
    );
    await mustHaveText(alertStatus, /^Alert accepted$/, 'the JS Alert card shows the alert was closed');

    // 2. JS Confirm: dismiss it, then prove the page received Cancel, not OK.
    await dialogs.handleDialog(
      { type: 'confirm', message: 'Do you confirm this action?', answer: (dialog) => dialog.dismiss() },
      () => alertsPage.getByRole('button', { name: 'Trigger Confirm', exact: true }).click(),
    );
    await mustHaveText(confirmStatus, /^You clicked: Cancel$/, 'the JS Confirm card shows Cancel');

    // 3. JS Prompt: answer "Ravi Kumar" and accept. accept(text) replaces the default "Jane Doe".
    //    The whole-text status check proves the page received exactly "Ravi Kumar", not "Jane Doe"
    //    and not both joined together.
    await dialogs.handleDialog(
      { type: 'prompt', message: 'Enter your name:', answer: (dialog) => dialog.accept('Ravi Kumar') },
      () => alertsPage.getByRole('button', { name: 'Trigger Prompt', exact: true }).click(),
    );
    await mustHaveText(promptStatus, /^You entered: Ravi Kumar$/, 'the JS Prompt card shows the answer Ravi Kumar');

    // 4. Delayed Alert: the click returns at once and the alert opens about 2 seconds later.
    //    handleDialog waits for that dialog event (up to DIALOG_TIMEOUT_MS), with no fixed sleep.
    await dialogs.handleDialog(
      { type: 'alert', message: 'This alert took 2 seconds to appear!', answer: (dialog) => dialog.accept() },
      () => alertsPage.getByRole('button', { name: 'Trigger Delayed Alert (2s)', exact: true }).click(),
    );
    await mustHaveText(delayedStatus, /^Delayed alert accepted$/, 'the Delayed Alert card shows the alert was closed');

    // Last: no other dialog appeared at any point. This runs after every card has reached its final status.
    dialogs.mustHaveNoUnexpectedDialogs();
  } finally {
    if (tracePath) await context.tracing.stop({ path: tracePath });
  }

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

// ---- Dialogs. Native dialogs are not part of the page, so they are handled through Playwright's dialog event. ----

type ExpectedDialog = {
  type: 'alert' | 'confirm' | 'prompt';
  message: string;
  answer: (dialog: Dialog) => Promise<void>;
};

type DialogWatcher = {
  handleDialog: (expected: ExpectedDialog, trigger: () => Promise<void>) => Promise<void>;
  mustHaveNoUnexpectedDialogs: () => void;
};

// Listens to every dialog on the page for the rest of the run.
// Playwright dismisses a dialog by itself only when nothing listens for dialogs. Because this listener
// is always there, every dialog is either the one we expect, answered as planned, or a recorded failure.
function watchDialogs(page: Page): DialogWatcher {
  let waiting: { expected: ExpectedDialog; finish: (error?: Error) => void } | undefined;
  const unexpected: string[] = [];

  page.on('dialog', async (dialog) => {
    const seen = `${dialog.type()} "${dialog.message()}"`;
    const current = waiting;
    // One expectation answers one dialog. A second dialog from the same click counts as unexpected.
    waiting = undefined;
    try {
      if (!current) {
        unexpected.push(seen);
        // Close it so the page is not blocked. The script still fails in mustHaveNoUnexpectedDialogs.
        await dialog.dismiss();
      } else if (dialog.type() !== current.expected.type || dialog.message() !== current.expected.message) {
        // Wrong dialog: close it so the page is not blocked, and fail the step that expected another one.
        await dialog.dismiss();
        current.finish(
          new Error(`Check failed: expected the ${current.expected.type} "${current.expected.message}", but got the ${seen}.`),
        );
      } else {
        await current.expected.answer(dialog);
        console.log(`Handled the ${seen}.`);
        current.finish();
      }
    } catch (error) {
      // Without an expectation, the dialog is already recorded as unexpected, so the run still fails.
      current?.finish(new Error(`Check failed: could not answer the ${seen}.`, { cause: error }));
    }
  });

  // Clicks the trigger and answers the dialog it opens. Fails when no dialog opens in time,
  // or when the dialog has the wrong type or message.
  async function handleDialog(expected: ExpectedDialog, trigger: () => Promise<void>): Promise<void> {
    mustHaveNoUnexpectedDialogs();
    let timer: ReturnType<typeof setTimeout> | undefined;
    // The expectation is registered before the click (rule 14), so a dialog that opens at once is still ours.
    const answered = new Promise<void>((resolve, reject) => {
      waiting = { expected, finish: (error) => (error ? reject(error) : resolve()) };
      // An upper limit, not a sleep: the promise settles as soon as the dialog has been answered.
      timer = setTimeout(() => {
        waiting = undefined;
        reject(new Error(`Check failed: no ${expected.type} "${expected.message}" appeared within ${DIALOG_TIMEOUT_MS} ms.`));
      }, DIALOG_TIMEOUT_MS);
    });
    try {
      // Wait for both together: when a dialog opens during the click, the click only finishes after it is closed.
      await Promise.all([answered, trigger()]);
    } finally {
      clearTimeout(timer);
      waiting = undefined;
    }
  }

  // Fails if any dialog arrived while none was expected.
  function mustHaveNoUnexpectedDialogs(): void {
    if (unexpected.length > 0) {
      throw new Error(`Check failed: no unexpected dialog appears. Found ${unexpected.length}: ${unexpected.join(', ')}.`);
    }
  }

  return { handleDialog, mustHaveNoUnexpectedDialogs };
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
