import java.time.Duration;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/advanced/tables");

        // TODO: find the top Designer, then sort and filter the other tables.
        // Print with: System.out.println(text);

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
