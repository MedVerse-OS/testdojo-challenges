"""
Shadow Walker (Medium) · Advanced › Shadow DOM

1. Open Shadow Root: click the button inside the shadow root.
2. Nested Shadow Roots: click the button in the inner shadow root
   (a shadow root inside another one).
3. Shadow DOM Form Input: type No shadow can hide from me

Leave the Closed Shadow Root alone: nothing can reach inside it.
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
driver.get(f"{base_url}/advanced/shadow-dom")

# TODO: reach into the shadow roots.

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
