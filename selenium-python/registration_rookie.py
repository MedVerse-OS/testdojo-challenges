"""
Registration Rookie (Easy) · Elements › Forms

1. Fill the registration form:
     Full name      Asha Verma
     Email          asha.verma@example.com
     Phone          9876543210
     Date of birth  21 April 1998
     Password       any, at least 6 characters, confirmed
2. Submit the form and wait for the success message.
3. In the Autosuggest field, type "Ind" and choose "India" from the suggestions.
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
driver.get(f"{base_url}/elements/forms.html")

# TODO: fill the form, submit it, then pick India from the autosuggest.

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
