// Patience Pays (Medium) · Elements › Dynamic
//
// Use waits throughout, not fixed sleeps.
//
// 1. Delayed Content: click Load Data, wait for the result and print it.
// 2. Progress Bar: click Start and wait until it says Complete!
// 3. Live Countdown: click Start Countdown and wait until it says Done!
// 4. Delayed Enable: wait for Submit to be enabled, then click it once.
// 5. Unstable ID: click Regenerate ID, then find the element by its
//    data-testid and print its new id.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class PatiencePays
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/elements/dynamic");

        // TODO: wait for each element, then print the loaded text and the new id.
        // Print with: Console.WriteLine(text);

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
