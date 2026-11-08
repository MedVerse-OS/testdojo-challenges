import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/flows/login");

        // TODO: try the three failing sign-ins, print each error, then sign in.
        // Print with: System.out.println(text);

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
