import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/**
 * Tab Tamer (Hard) · Browser › Tabs and Windows
 *
 * 1. Click Open Link in New Tab, switch to the new tab and click its button.
 *    Leave that tab open.
 * 2. Back on the Tabs page, click Open 3 Tabs, then close Tab B only.
 * 3. Go to the Windows page, click Open Window (2s delay), wait for the
 *    window to open and click its button.
 */
public class TabTamer {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/browser/tabs");

            // TODO: work with the new tabs and the delayed window.

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
