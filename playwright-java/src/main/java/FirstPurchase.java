import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.AriaRole;
import java.util.regex.Pattern;

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
public class FirstPurchase {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/flows/shop.html");

            // TODO: buy one Wireless Mouse, then print the order number,
            // for example: System.out.println("Order number: " + orderNumber);

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
