"""
Upload Ready (Easy) · Advanced › Upload / Download

The files are in the folder `fixtures` points to (set up for you below).

1. Upload a Single File: upload resume.pdf.
2. Upload Multiple Files: upload photo.png and notes.txt together.
3. Drag-and-Drop Upload Zone: upload photo.png. Its file input is hidden,
   so find a way to hand it the file.
"""
import os
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
options = webdriver.ChromeOptions()
options.debugger_address = os.environ.get("TESTDOJO_DEBUGGER", "127.0.0.1:9222")
driver = webdriver.Chrome(options=options)
base_url = os.environ.get("TESTDOJO_URL", "https://testdojo.dev")
# Folder with the files to upload (the checks provide it).
fixtures = Path(os.environ.get("TESTDOJO_FIXTURES", "fixtures")).resolve()

# ---- Your code ----
driver.get(f"{base_url}/advanced/upload-download")

# TODO: upload the three files.

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
