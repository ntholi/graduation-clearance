import logging
import os
import pickle
from urllib.parse import quote_plus

import requests
import urllib3
from bs4 import BeautifulSoup, Tag
from requests import Response
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from urllib3.exceptions import InsecureRequestWarning

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

BASE_URL = "https://cmslesotho.limkokwing.net/campus/registry"
SESSION_FILE = "session.pkl"

urllib3.disable_warnings(InsecureRequestWarning)


def get_form_payload(form: Tag):
    data = {}
    inputs = form.select("input")
    for tag in inputs:
        if tag.attrs["type"] == "hidden":
            data[tag.attrs["name"]] = tag.attrs["value"]
    return data


def check_logged_in(html: str) -> bool:
    page = BeautifulSoup(html, "lxml")
    form = page.select_one("form")
    if form:
        if form.attrs.get("action") == "login.php":
            return False
    return True


class Browser:
    _instance = None
    logged_in = False
    session: requests.Session | None = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Browser, cls).__new__(cls)
            cls._instance.load_session()
        return cls._instance

    def load_session(self):
        if os.path.exists(SESSION_FILE):
            with open(SESSION_FILE, "rb") as f:
                self.session = pickle.load(f)
            logger.info("Loaded existing session")
        else:
            self.session = requests.Session()
            self.session.verify = False
            logger.info("Created new session")

    def save_session(self):
        with open(SESSION_FILE, "wb") as f:
            pickle.dump(self.session, f)
        logger.info("Saved session")

    def login(self):
        logger.info("Logging in...")
        driver = webdriver.Firefox()
        url = f"{BASE_URL}/login.php"
        logger.info(f"Fetching {url}")
        driver.get(url)
        WebDriverWait(driver, 60 * 3).until(
            expected_conditions.presence_of_element_located(
                (By.LINK_TEXT, "[ Logout ]")
            )
        )
        logger.info("Logged in successfully")

        selenium_cookies = driver.get_cookies()
        driver.quit()

        if self.session is None:
            raise ValueError("Session is not initialized")

        self.session.cookies.clear()
        for cookie in selenium_cookies:
            self.session.cookies.set(
                cookie["name"], cookie["value"], domain=cookie["domain"]
            )

        self.save_session()

    def fetch(self, url: str) -> Response:
        if self.session is None:
            raise ValueError("Session is not initialized")
        logger.info(f"Fetching {url}")
        response = self.session.get(url, timeout=60)
        is_logged_in = check_logged_in(response.text)
        if not is_logged_in:
            logger.info("Session expired, logging in again")
            self.login()
            logger.info(f"Logged in, re-fetching {url}")
            response = self.session.get(url)
        if response.status_code != 200:
            logger.warning(f"Unexpected status code: {response.status_code}")
        return response

    def post(self, url: str, data: dict | str) -> Response:
        if self.session is None:
            raise ValueError("Session is not initialized")
        logger.info(f"Posting to {url}")
        logger.info(f"Data: {data}")
        response = self.session.post(url, data, timeout=120)
        is_logged_in = check_logged_in(response.text)
        if not is_logged_in:
            logger.info("Not logged in")
            self.login()
            logger.info(f"Logged in, re-posting to {url}")
            response = self.session.post(url, data, timeout=120)
        if response.status_code != 200:
            logger.warning(f"Unexpected status code: {response.status_code}")
        return response
