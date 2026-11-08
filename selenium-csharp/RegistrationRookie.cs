// Registration Rookie (Easy) · Elements › Forms
//
// 1. Fill the registration form:
//      Full name      Asha Verma
//      Email          asha.verma@example.com
//      Phone          9876543210
//      Date of birth  21 April 1998
//      Password       any, at least 6 characters, confirmed
// 2. Submit the form and wait for the success message.
// 3. In the Autosuggest field, type "Ind" and choose "India" from the suggestions.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class RegistrationRookie
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/elements/forms.html");

        // TODO: fill the form, submit it, then pick India from the autosuggest.

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
