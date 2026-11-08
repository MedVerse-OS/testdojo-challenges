// Gatekeeper (Medium) · Flows › Login
//
// Try three sign-ins that must fail, in this order, and print the error
// message the page shows for each. Then sign in for real.
//
// 1. Email demo@test, password Test1234      -> print the email error.
// 2. Email demo@test.com, no password         -> print the password error.
// 3. Email demo@test.com, password Wrong123   -> print the message above the form.
// 4. Sign in with demo@test.com / Test1234 and wait for the dashboard.
//
// Clear the fields between attempts.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class Gatekeeper
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/flows/login");

        // TODO: try the three failing sign-ins, print each error, then sign in.
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
