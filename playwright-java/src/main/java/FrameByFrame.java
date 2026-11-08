import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

/**
 * Frame by Frame (Medium) · Browser › Frames
 *
 * 1. Single Iframe: click the button inside it.
 * 2. Nested Iframes: click the button in the inner frame (it sits inside the outer frame).
 * 3. Multiple Iframes: click the button in Frame B only.
 * 4. Dynamically Loaded Iframe: click Load Iframe (2s), wait for the frame,
 *    then click the button inside it.
 * 5. Switch back to the main page when you're done.
 */
public class FrameByFrame {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/browser/frames");

            // TODO: click the buttons inside the frames.

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
