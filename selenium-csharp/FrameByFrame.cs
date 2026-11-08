// Frame by Frame (Medium) · Browser › Frames
//
// 1. Single Iframe: click the button inside it.
// 2. Nested Iframes: click the button in the inner frame (it sits inside the outer frame).
// 3. Multiple Iframes: click the button in Frame B only.
// 4. Dynamically Loaded Iframe: click Load Iframe (2s), wait for the frame,
//    then click the button inside it.
// 5. Switch back to the main page when you're done.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class FrameByFrame
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/browser/frames");

        // TODO: click the buttons inside the frames.

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
