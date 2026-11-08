import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

/**
 * Registration Rookie (Easy) · Elements › Forms
 *
 * 1. Fill the registration form:
 *      Full name      Asha Verma
 *      Email          asha.verma@example.com
 *      Phone          9876543210
 *      Date of birth  21 April 1998
 *      Password       any, at least 6 characters, confirmed
 * 2. Submit the form and wait for the success message.
 * 3. In the Autosuggest field, type "Ind" and choose "India" from the suggestions.
 */
public class RegistrationRookie {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/elements/forms.html");

            // TODO: fill the form, submit it, then pick India from the autosuggest.

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
