import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.SearchContext;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Shadow Walker (Medium) · Advanced › Shadow DOM
 *
 * 1. Open Shadow Root: click the button inside the shadow root.
 * 2. Nested Shadow Roots: click the button in the inner shadow root
 *    (a shadow root inside another one).
 * 3. Shadow DOM Form Input: type No shadow can hide from me
 *
 * Leave the Closed Shadow Root alone: nothing can reach inside it.
 */
public class ShadowWalker {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/advanced/shadow-dom");

        // TODO: reach into the shadow roots.

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
