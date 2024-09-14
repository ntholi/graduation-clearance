import logging

from browser import BASE_URL, Browser
from bs4 import BeautifulSoup, PageElement, Tag

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class Scrapper:
    def __init__(self):
        self.browser = Browser()

    def get_student_data(self, std_no: str):
        self.browser.login()
