import java.time.Duration;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/browser/alerts");

        // TODO: handle the four dialogs.

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
