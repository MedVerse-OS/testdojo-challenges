// Table Detective (Medium) · Advanced › Tables
//
// 1. Paginate Table: page through the whole table and find the Designer with
//    the highest score. Print their name and score, e.g. Top designer: Name (90).
// 2. Leave the paginated table on the page that shows that person.
// 3. Sort by Column: sort the table by Score, highest first.
// 4. Filter Table Rows: filter the names by Shah.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class TableDetective
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/advanced/tables");

        // TODO: find the top Designer, then sort and filter the other tables.
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
