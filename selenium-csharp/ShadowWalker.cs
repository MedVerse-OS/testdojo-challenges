// Shadow Walker (Medium) · Advanced › Shadow DOM
//
// 1. Open Shadow Root: click the button inside the shadow root.
// 2. Nested Shadow Roots: click the button in the inner shadow root
//    (a shadow root inside another one).
// 3. Shadow DOM Form Input: type No shadow can hide from me
//
// Leave the Closed Shadow Root alone: nothing can reach inside it.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class ShadowWalker
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/advanced/shadow-dom");

        // TODO: reach into the shadow roots.

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
