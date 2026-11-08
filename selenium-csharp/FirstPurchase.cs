// First Purchase (Easy) · Flows › E-commerce
//
// 1. Start at the shop and add one Wireless Mouse to the cart.
// 2. Go to checkout. Don't apply a promo code.
// 3. Fill the shipping details and keep Standard shipping:
//      Full name  Priya Shah
//      Email      priya@example.com
//      Address    221 MG Road
//      City       Bengaluru
//      Country    India
//      PIN code   560001
//      Phone      9876543210
// 4. Pay with the approved test card 4242 4242 4242 4242, expiry 12/30, CVV 123.
// 5. Wait for the order confirmation page and print the order number it shows.

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

public static class FirstPurchase
{
    public static void Main()
    {
        // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
        var options = new ChromeOptions { DebuggerAddress = Env("TESTDOJO_DEBUGGER", "127.0.0.1:9222") };
        IWebDriver driver = new ChromeDriver(options);
        var baseUrl = Env("TESTDOJO_URL", "https://testdojo.dev");

        // ---- Your code ----
        driver.Navigate().GoToUrl($"{baseUrl}/flows/shop.html");

        // TODO: buy one Wireless Mouse, then print the order number,
        // for example: Console.WriteLine($"Order number: {orderNumber}");

        // ---- Done. Don't call driver.Quit(): the checks inspect the browser after you finish. ----
        Environment.Exit(0);
    }

    private static string Env(string name, string fallback)
    {
        var value = Environment.GetEnvironmentVariable(name);
        return string.IsNullOrEmpty(value) ? fallback : value;
    }
}
