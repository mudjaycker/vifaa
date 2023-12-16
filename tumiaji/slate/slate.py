from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
# from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import threading
import time
from queue import Queue
que = Queue()


from_ = "sw"
to = "lg"
text = "Hii ni jaribu kidogo kutoka programu yangu".replace(" ", "%20")
url = f"https://translate.google.com/?sl={from_}&tl={to}&text={text}&op=translate"
# text = "Ntare Rugamba"
# url = "http://www.google.com"

options = Options()
options.add_experimental_option("detach", True)
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--headless')
path = "/snap/bin/chromium.chromedriver"
driver = webdriver.Chrome(service=Service(path), options=options)
driver.get(url)
# ele = WebDriverWait(driver, 20).until(EC.visibility_of_element_located((By.CLASS_NAME, "ryNqvb")))
found = driver.find_element(By.CSS_SELECTOR, "span.ryNqvb")

print(found.text)


print("end...")