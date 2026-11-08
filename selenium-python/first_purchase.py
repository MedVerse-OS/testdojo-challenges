"""
First Purchase (Easy) · Flows › E-commerce

1. Start at the shop and add one Wireless Mouse to the cart.
2. Go to checkout. Don't apply a promo code.
3. Fill the shipping details and keep Standard shipping:
     Full name  Priya Shah
     Email      priya@example.com
     Address    221 MG Road
     City       Bengaluru
     Country    India
     PIN code   560001
     Phone      9876543210
4. Pay with the approved test card 4242 4242 4242 4242, expiry 12/30, CVV 123.
5. Wait for the order confirmation page and print the order number it shows.
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
driver.get(f"{base_url}/flows/shop.html")

# TODO: buy one Wireless Mouse, then print the order number,
# for example: print(f"Order number: {order_number}")

# ---- Done. Don't call driver.quit(): the checks inspect the browser after you finish. ----
