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

async function main(): Promise<void> {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page: Page = context.pages()[0] ?? (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/flows/shop.html`);

  // TODO: buy one Wireless Mouse, then print the order number,
  // for example: console.log(`Order number: ${orderNumber}`);

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
