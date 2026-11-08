"""
Table Detective (Medium) · Advanced › Tables

1. Paginate Table: page through the whole table and find the Designer with
   the highest score. Print their name and score, e.g. Top designer: Name (90).
2. Leave the paginated table on the page that shows that person.
3. Sort by Column: sort the table by Score, highest first.
4. Filter Table Rows: filter the names by Shah.
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
driver.get(f"{base_url}/advanced/tables")

# TODO: find the top Designer, then sort and filter the other tables.
# Print with: print(text)

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
