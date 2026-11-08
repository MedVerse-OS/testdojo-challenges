"""
Frame by Frame (Medium) · Browser › Frames

1. Single Iframe: click the button inside it.
2. Nested Iframes: click the button in the inner frame (it sits inside the outer frame).
3. Multiple Iframes: click the button in Frame B only.
4. Dynamically Loaded Iframe: click Load Iframe (2s), wait for the frame,
   then click the button inside it.
5. Switch back to the main page when you're done.
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
driver.get(f"{base_url}/browser/frames")

# TODO: click the buttons inside the frames.

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
