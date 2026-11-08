import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Frame by Frame (Medium) · Browser › Frames
 *
 * 1. Single Iframe: click the button inside it.
 * 2. Nested Iframes: click the button in the inner frame (it sits inside the outer frame).
 * 3. Multiple Iframes: click the button in Frame B only.
 * 4. Dynamically Loaded Iframe: click Load Iframe (2s), wait for the frame,
 *    then click the button inside it.
 * 5. Switch back to the main page when you're done.
 */
public class FrameByFrame {
    public static void main(String[] args) {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.get(baseUrl + "/browser/frames");

        // TODO: click the buttons inside the frames.

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
