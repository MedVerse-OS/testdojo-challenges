"""
Gatekeeper (Medium) · Flows › Login

Try three sign-ins that must fail, in this order, and print the error
message the page shows for each. Then sign in for real.

1. Email demo@test, password Test1234      -> print the email error.
2. Email demo@test.com, no password         -> print the password error.
3. Email demo@test.com, password Wrong123   -> print the message above the form.
4. Sign in with demo@test.com / Test1234 and wait for the dashboard.

Clear the fields between attempts.
"""
import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
options = webdriver.ChromeOptions()
options.debugger_address = os.environ.get("TESTDOJO_DEBUGGER", "127.0.0.1:9222")
driver = webdriver.Chrome(options=options)
base_url = os.environ.get("TESTDOJO_URL", "https://testdojo.dev")

# ---- Your code ----
driver.get(f"{base_url}/flows/login")

# TODO: try the three failing sign-ins, print each error, then sign in.
# Print with: print(text)

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
