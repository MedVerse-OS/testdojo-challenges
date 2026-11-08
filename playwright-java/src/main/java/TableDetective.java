import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import java.util.List;

/**
 * Table Detective (Medium) · Advanced › Tables
 *
 * 1. Paginate Table: page through the whole table and find the Designer with
 *    the highest score. Print their name and score, e.g. Top designer: Name (90).
 * 2. Leave the paginated table on the page that shows that person.
 * 3. Sort by Column: sort the table by Score, highest first.
 * 4. Filter Table Rows: filter the names by Shah.
 */
public class TableDetective {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

            // ---- Your code ----
            page.navigate(baseUrl + "/advanced/tables");

            // TODO: find the top Designer, then sort and filter the other tables.
            // Print with: System.out.println(text);

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
