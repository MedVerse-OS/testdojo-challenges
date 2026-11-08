/**
 * First Purchase (Easy) · Flows › E-commerce
 *
 * 1. Start at the shop and add one Wireless Mouse to the cart.
 * 2. Go to checkout. Don't apply a promo code.
 * 3. Fill the shipping details and keep Standard shipping:
 *      Full name  Priya Shah
 *      Email      priya@example.com
 *      Address    221 MG Road
 *      City       Bengaluru
 *      Country    India
 *      PIN code   560001
 *      Phone      9876543210
 * 4. Pay with the approved test card 4242 4242 4242 4242, expiry 12/30, CVV 123.
 * 5. Wait for the order confirmation page and print the order number it shows.
 */
import { chromium, type Page } from 'playwright';
import type { Locator } from 'playwright';

// The site builds order numbers as "TD-", the order date as YYYYMMDD, "-", then 4 characters
// from A to Z (without I and O) and 2 to 9 (source: orderId() in the checkout page).
// The confirmation page asks for a format check, because the number is new for every order.
// Med approved this format for the exercise on 2026-11-08. The date part stays variable.
const ORDER_NUMBER_FORMAT = /^TD-\d{8}-[A-HJ-NP-Z2-9]{4}$/;

// Checks: one Wireless Mouse is bought with Standard shipping and no promo, and a valid order number is shown.
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
    await page.goto(`${baseUrl}/flows/shop.html`);

    // Shop: the cart must start empty, so "exactly one line" below means the one we add.
    const cart = page.getByRole('complementary', { name: 'Your cart' });
    await mustBeVisible(cart.getByText('Your cart is empty'), 'the cart starts empty');

    const mouseCard = page.getByRole('main').getByRole('article').filter({
      has: page.getByRole('heading', { name: 'Wireless Mouse', exact: true }),
    });
    await mouseCard.getByRole('button', { name: 'Add to cart' }).click();

    // Adding takes about 800 ms. The new cart line appearing is the signal that it finished.
    const mouseLine = cart.getByRole('listitem').filter({ hasText: 'Wireless Mouse' });
    await mustBeVisible(mouseLine, 'the Wireless Mouse appears in the cart');
    await mustBeVisible(cart.getByRole('listitem'), 'the cart holds exactly one line');
    await mustHaveText(mouseLine.getByTestId('qty-M100'), /^1$/, 'the Wireless Mouse quantity is 1');

    await cart.getByRole('button', { name: 'Proceed to checkout' }).click();
    await page.waitForURL('**/flows/checkout');

    // Checkout step 1: review the cart. We type no promo code and go straight on.
    const review = page.getByRole('region', { name: 'Review your cart' });
    await review.getByRole('button', { name: 'Continue to shipping' }).click();

    // Checkout step 2: shipping details, with the exercise's made-up data.
    const shipping = page.getByRole('region', { name: 'Shipping details' });
    await shipping.getByLabel('Full name', { exact: true }).fill('Priya Shah');
    await shipping.getByLabel('Email', { exact: true }).fill('priya@example.com');
    await shipping.getByLabel('Street address', { exact: true }).fill('221 MG Road');
    await shipping.getByLabel('City', { exact: true }).fill('Bengaluru');
    await shipping.getByLabel('Country', { exact: true }).selectOption({ label: 'India' });
    await shipping.getByLabel('PIN code', { exact: true }).fill('560001');
    await shipping.getByLabel('Phone', { exact: true }).fill('9876543210');

    // Standard is the default. Confirm it is selected instead of assuming it.
    await mustBeChecked(shipping.getByRole('radio', { name: /^Standard/ }), 'Standard shipping is selected');
    await shipping.getByRole('button', { name: 'Continue to payment' }).click();

    // Checkout step 3: payment with the site's approved test card.
    const payment = page.getByRole('region', { name: 'Payment' });
    // The site requires a name on the card. The exercise gives none, so we use the buyer's name
    // (approved by Med on 2026-11-08).
    await payment.getByLabel('Name on card', { exact: true }).fill('Priya Shah');
    await payment.getByLabel('Card number', { exact: true }).fill('4242 4242 4242 4242');
    await payment.getByLabel('Expiry (MM/YY)', { exact: true }).fill('12/30');
    await payment.getByLabel('CVV', { exact: true }).fill('123');
    // The button text includes the total ("Place order ($24.99)"), so match only its start.
    await payment.getByRole('button', { name: /^Place order/ }).click();

    // Confirmation: the site processes the payment for a moment, then opens a new page.
    await page.waitForURL('**/flows/order-confirmation');
    const confirmation = page.getByRole('main');
    await mustBeVisible(
      confirmation.getByRole('heading', { name: 'Order Confirmation', level: 1 }),
      'the order confirmation page is shown',
    );

    const orderNumber = confirmation.getByTestId('order-id');
    await mustHaveText(orderNumber, ORDER_NUMBER_FORMAT, 'the order number has the TD-YYYYMMDD-XXXX format');
    console.log(`Order number: ${(await orderNumber.innerText()).trim()}`);

    // The placed order must hold exactly one Wireless Mouse, quantity 1.
    // #order-rows is the table body: product rows only, without the header or the totals.
    const itemsTable = confirmation.getByRole('table');
    const productRow = itemsTable.locator('#order-rows').getByRole('row');
    await mustBeVisible(productRow, 'the order has exactly one product row');
    await mustHaveText(await cellInColumn(itemsTable, productRow, 'Item'), /^Wireless Mouse$/, 'the ordered product is Wireless Mouse');
    await mustHaveText(await cellInColumn(itemsTable, productRow, 'Qty'), /^1$/, 'the ordered quantity is 1');

    // The placed order must show the approved card, Standard delivery, and no discount.
    await mustHaveText(confirmation.locator('#order-card'), /^Card ending 4242$/, 'the order was paid with the test card');
    await mustHaveText(confirmation.locator('#order-delivery'), /\(Standard\)$/, 'the order ships Standard');
    await mustBeVisible(confirmation.getByRole('row', { name: /^Total paid/ }), 'the order totals are shown');
    await mustBeAbsent(confirmation.getByRole('row', { name: /^Discount/ }), 'no promo discount is applied');
  } finally {
    if (tracePath) await context.tracing.stop({ path: tracePath });
  }

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

// ---- Checks. Each one waits for the page, and throws a clear error when it fails. ----

// Waits until the locator matches exactly one visible element.
// Playwright's waitFor is strict: it fails when several elements match, not only when none do.
async function mustBeVisible(locator: Locator, what: string): Promise<void> {
  try {
    await locator.waitFor({ state: 'visible' });
  } catch (error) {
    throw new Error(`Check failed: ${what}.`, { cause: error });
  }
}

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

// Returns the row's cell in the column with this header, so checks follow the header, not a guessed position.
// textContent is used because the page shows headers in capitals with CSS ("QTY"); the real text is "Qty".
async function cellInColumn(table: Locator, row: Locator, header: string): Promise<Locator> {
  const headers = (await table.getByRole('columnheader').allTextContents()).map((text) => text.trim());
  const column = headers.indexOf(header);
  if (column === -1) {
    throw new Error(`Check failed: the table has no "${header}" column. Found ${JSON.stringify(headers)}.`);
  }
  return row.getByRole('cell').nth(column);
}

// Waits for the checkbox or radio button, then fails unless it is checked.
async function mustBeChecked(locator: Locator, what: string): Promise<void> {
  if (!(await locator.isChecked())) {
    throw new Error(`Check failed: ${what}.`);
  }
}

// Fails when the locator matches anything. It does not wait, so call it only after
// a check has shown that the part of the page it looks at has finished rendering.
async function mustBeAbsent(locator: Locator, what: string): Promise<void> {
  const count = await locator.count();
  if (count !== 0) {
    throw new Error(`Check failed: ${what}. Found ${count} matching element(s).`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
