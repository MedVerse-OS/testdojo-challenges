import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/flows/login");

        // TODO: trigger the lockout, print its message, wait it out, then sign in.
        // Print with: System.out.println(text);

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
