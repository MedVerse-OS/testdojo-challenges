// Alert Ace (Easy) · Browser › Alerts
//
// 1. JS Alert: click Trigger Alert and accept the alert.
// 2. JS Confirm: click Trigger Confirm and dismiss it (Cancel).
// 3. JS Prompt: click Trigger Prompt, type Ravi Kumar and accept.
// 4. Delayed Alert: click the button, wait for the alert to appear
//    (use a wait, not a fixed sleep), then accept it.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class AlertAce
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/browser/alerts");

        // TODO: handle the four dialogs.

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
