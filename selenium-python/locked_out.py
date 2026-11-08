"""
Locked Out (Hard) · Flows › Login

1. Sign in with demo@test.com and the wrong password Guess123, three times.
   The form locks.
2. Print the lockout message.
3. Wait for the lockout to end (about 10 seconds): wait until Sign In is
   enabled again rather than sleeping for a fixed time.
4. Sign in with demo@test.com / Test1234 and wait for the dashboard.
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

# TODO: trigger the lockout, print its message, wait it out, then sign in.
# Print with: print(text)

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
