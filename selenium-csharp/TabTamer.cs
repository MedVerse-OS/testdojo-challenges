// Tab Tamer (Hard) · Browser › Tabs and Windows
//
// 1. Click Open Link in New Tab, switch to the new tab and click its button.
//    Leave that tab open.
// 2. Back on the Tabs page, click Open 3 Tabs, then close Tab B only.
// 3. Go to the Windows page, click Open Window (2s delay), wait for the
//    window to open and click its button.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class TabTamer
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/browser/tabs");

        // TODO: work with the new tabs and the delayed window.

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
