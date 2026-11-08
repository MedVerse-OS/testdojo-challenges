import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

/**
 * Locked Out (Hard) · Flows › Login
 *
 * 1. Sign in with demo@test.com and the wrong password Guess123, three times.
 *    The form locks.
 * 2. Print the lockout message.
 * 3. Wait for the lockout to end (about 10 seconds): wait until Sign In is
 *    enabled again rather than sleeping for a fixed time.
 * 4. Sign in with demo@test.com / Test1234 and wait for the dashboard.
 */
public class LockedOut {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/flows/login");

            // TODO: trigger the lockout, print its message, wait it out, then sign in.
            // Print with: System.out.println(text);

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
