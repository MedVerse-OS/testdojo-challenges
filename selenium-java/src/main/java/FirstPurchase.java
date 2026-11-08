import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * First Purchase (Easy) · Flows › E-commerce
 *
 * 1. Start at the shop and add one Wireless Mouse to the cart.
 * 2. Go to checkout. Don't apply a promo code.
 * 3. Fill the shipping details and keep Standard shipping:
 *      Full name  Priya Shah
 *      Email      priya@example.com
 *      Address    221 MG Road
 *      City       Bengaluru
 *      Country    India
 *      PIN code   560001
 *      Phone      9876543210
 * 4. Pay with the approved test card 4242 4242 4242 4242, expiry 12/30, CVV 123.
 * 5. Wait for the order confirmation page and print the order number it shows.
 */
public class FirstPurchase {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/flows/shop.html");

        // TODO: buy one Wireless Mouse, then print the order number,
        // for example: System.out.println("Order number: " + orderNumber);

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
