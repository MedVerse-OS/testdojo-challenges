import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

/**
 * Patience Pays (Medium) · Elements › Dynamic
 *
 * Use waits throughout, not fixed sleeps.
 *
 * 1. Delayed Content: click Load Data, wait for the result and print it.
 * 2. Progress Bar: click Start and wait until it says Complete!
 * 3. Live Countdown: click Start Countdown and wait until it says Done!
 * 4. Delayed Enable: wait for Submit to be enabled, then click it once.
 * 5. Unstable ID: click Regenerate ID, then find the element by its
 *    data-testid and print its new id.
 */
public class PatiencePays {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/elements/dynamic");

            // TODO: wait for each element, then print the loaded text and the new id.
            // Print with: System.out.println(text);

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
