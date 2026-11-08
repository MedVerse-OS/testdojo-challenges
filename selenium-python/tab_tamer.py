"""
Tab Tamer (Hard) · Browser › Tabs and Windows

1. Click Open Link in New Tab, switch to the new tab and click its button.
   Leave that tab open.
2. Back on the Tabs page, click Open 3 Tabs, then close Tab B only.
3. Go to the Windows page, click Open Window (2s delay), wait for the
   window to open and click its button.
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
driver.get(f"{base_url}/browser/tabs")

# TODO: work with the new tabs and the delayed window.

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
