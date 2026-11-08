import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

/**
 * Gatekeeper (Medium) · Flows › Login
 *
 * Try three sign-ins that must fail, in this order, and print the error
 * message the page shows for each. Then sign in for real.
 *
 * 1. Email demo@test, password Test1234      -> print the email error.
 * 2. Email demo@test.com, no password         -> print the password error.
 * 3. Email demo@test.com, password Wrong123   -> print the message above the form.
 * 4. Sign in with demo@test.com / Test1234 and wait for the dashboard.
 *
 * Clear the fields between attempts.
 */
public class Gatekeeper {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/flows/login");

            // TODO: try the three failing sign-ins, print each error, then sign in.
            // Print with: System.out.println(text);

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
