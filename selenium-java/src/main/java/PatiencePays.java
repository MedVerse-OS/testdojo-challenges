import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/elements/dynamic");

        // TODO: wait for each element, then print the loaded text and the new id.
        // Print with: System.out.println(text);

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
