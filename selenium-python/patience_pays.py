"""
Patience Pays (Medium) · Elements › Dynamic

Use waits throughout, not fixed sleeps.

1. Delayed Content: click Load Data, wait for the result and print it.
2. Progress Bar: click Start and wait until it says Complete!
3. Live Countdown: click Start Countdown and wait until it says Done!
4. Delayed Enable: wait for Submit to be enabled, then click it once.
5. Unstable ID: click Regenerate ID, then find the element by its
   data-testid and print its new id.
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
driver.get(f"{base_url}/elements/dynamic")

# TODO: wait for each element, then print the loaded text and the new id.
# Print with: print(text)

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
