// Locked Out (Hard) · Flows › Login
//
// 1. Sign in with demo@test.com and the wrong password Guess123, three times.
//    The form locks.
// 2. Print the lockout message.
// 3. Wait for the lockout to end (about 10 seconds): wait until Sign In is
//    enabled again rather than sleeping for a fixed time.
// 4. Sign in with demo@test.com / Test1234 and wait for the dashboard.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class LockedOut
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/flows/login");

        // TODO: trigger the lockout, print its message, wait it out, then sign in.
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
