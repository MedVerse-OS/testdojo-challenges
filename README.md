# My TestDojo challenges

My solutions to the [TestDojo automation challenges](https://testdojo.dev/challenges).

Solve them right on TestDojo: pick a challenge, choose Selenium or Playwright and a language,
write your code in the editor, then **Commit & push** and **Run test**. Your code is saved here,
and the checks run in this repo's GitHub Actions.

Each challenge has one file per language. Registration Rookie and First Purchase, for example:

| Framework | Language | Your files |
|---|---|---|
| Selenium | Java | `selenium-java/src/main/java/RegistrationRookie.java`, `FirstPurchase.java` |
| Selenium | Python | `selenium-python/registration_rookie.py`, `first_purchase.py` |
| Selenium | C# | `selenium-csharp/RegistrationRookie.cs`, `FirstPurchase.cs` |
| Playwright | JavaScript | `playwright-js/registration-rookie.js`, `first-purchase.js` |
| Playwright | TypeScript | `playwright-ts/registration-rookie.ts`, `first-purchase.ts` |
| Playwright | Java | `playwright-java/src/main/java/RegistrationRookie.java`, `FirstPurchase.java` |

New challenges are added over time. If your repo doesn't have a challenge's file yet, just open
the challenge on TestDojo: the editor starts you from the starter code, and **Commit & push**
adds the file here.

Each file starts with a short **TestDojo setup** block that connects your code to the browser
the checks start. Leave that block as it is and write your automation below it.

> Don't edit `.github/workflows/testdojo.yml`. TestDojo only counts results from that exact workflow.
