import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/elements/forms.html");

        // TODO: fill the form, submit it, then pick India from the autosuggest.

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
