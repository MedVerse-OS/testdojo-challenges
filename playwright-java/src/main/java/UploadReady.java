import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Upload Ready (Easy) · Advanced › Upload / Download
 *
 * The files are in the folder `fixtures` points to (set up for you below).
 *
 * 1. Upload a Single File: upload resume.pdf.
 * 2. Upload Multiple Files: upload photo.png and notes.txt together.
 * 3. Drag-and-Drop Upload Zone: upload photo.png. Its file input is hidden,
 *    so find a way to hand it the file.
 */
public class UploadReady {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().connectOverCDP(env("TESTDOJO_CDP", "http://127.0.0.1:9222"));
            BrowserContext context = browser.contexts().get(0);
            Page page = context.pages().isEmpty() ? context.newPage() : context.pages().get(0);
            String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");
            // Folder with the files to upload (the checks provide it).
            Path fixtures = Paths.get(env("TESTDOJO_FIXTURES", "fixtures")).toAbsolutePath();

            // ---- Your code ----
            page.navigate(baseUrl + "/advanced/upload-download");

            // TODO: upload the three files.

        } // ---- Done. Closing Playwright only disconnects; the browser stays open for the checks. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
