import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

/**
 * Alert Ace (Easy) · Browser › Alerts
 *
 * 1. JS Alert: click Trigger Alert and accept the alert.
 * 2. JS Confirm: click Trigger Confirm and dismiss it (Cancel).
 * 3. JS Prompt: click Trigger Prompt, type Ravi Kumar and accept.
 * 4. Delayed Alert: click the button, wait for the alert to appear
 *    (use a wait, not a fixed sleep), then accept it.
 */
public class AlertAce {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/browser/alerts");

            // TODO: handle the four dialogs.

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
