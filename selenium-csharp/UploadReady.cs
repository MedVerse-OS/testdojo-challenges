// Upload Ready (Easy) · Advanced › Upload / Download
//
// The files are in the folder `fixtures` points to (set up for you below).
//
// 1. Upload a Single File: upload resume.pdf.
// 2. Upload Multiple Files: upload photo.png and notes.txt together.
// 3. Drag-and-Drop Upload Zone: upload photo.png. Its file input is hidden,
//    so find a way to hand it the file.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class UploadReady
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");
        // Folder with the files to upload (the checks provide it).
        var fixtures = Path.GetFullPath(Env("TESTDOJO_FIXTURES", "fixtures"));

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/advanced/upload-download");

        // TODO: upload the three files.

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
