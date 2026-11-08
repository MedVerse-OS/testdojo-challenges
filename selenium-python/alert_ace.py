"""
Alert Ace (Easy) · Browser › Alerts

1. JS Alert: click Trigger Alert and accept the alert.
2. JS Confirm: click Trigger Confirm and dismiss it (Cancel).
3. JS Prompt: click Trigger Prompt, type Ravi Kumar and accept.
4. Delayed Alert: click the button, wait for the alert to appear
   (use a wait, not a fixed sleep), then accept it.
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
driver.get(f"{base_url}/browser/alerts")

# TODO: handle the four dialogs.

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
