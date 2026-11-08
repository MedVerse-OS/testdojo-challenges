import java.nio.file.Path;
import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", env("TESTDOJO_DEBUGGER", "127.0.0.1:9222"));
        WebDriver driver = new ChromeDriver(options);
        String baseUrl = env("TESTDOJO_URL", "https://testdojo.dev");
        // Folder with the files to upload (the checks provide it).
        Path fixtures = Path.of(env("TESTDOJO_FIXTURES", "fixtures")).toAbsolutePath();

        // ---- Your code ----
        driver.get(baseUrl + "/advanced/upload-download");

        // TODO: upload the three files.

        // ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
        System.exit(0);
    }

    private static String env(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isEmpty() ? fallback : value;
    }
}
