import logging
import re
from decimal import Decimal, InvalidOperation
from typing import List, Tuple

from browser import BASE_URL, Browser
from bs4 import BeautifulSoup
from database.models import Enrollment, Grade, Student

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class Scrapper:
    def __init__(self):
        self.browser = Browser()

    def clean_decimal(self, value):
        """Clean and convert a string to Decimal, handling various formats."""
        try:
            return Decimal(value.replace(",", "").strip())
        except InvalidOperation:
            logger.warning(f"Could not convert '{value}' to Decimal. Using 0.")
            return Decimal("0")

    def get_student_data(
        self, std_no: int
    ) -> Tuple[Student, List[Tuple[Enrollment, List[Grade]]]]:
        url = f"{BASE_URL}/Officialreport.php?showmaster=1&StudentID={std_no}"
        response = self.browser.fetch(url)

        soup = BeautifulSoup(response.text, "html.parser")

        # Find the main table
        main_table = soup.find("table", class_="ewReportTable")
        if not main_table:
            logger.error("Could not find the main table with class 'ewReportTable'")
            return None, []

        # Extract student information
        student_data = {
            "std_no": std_no,
            "name": None,
            "national_id": None,
            "program": None,
        }

        student_rows = main_table.find_all("tr")[:5]
        for row in student_rows:
            cells = row.find_all("td")
            if len(cells) >= 2:
                label = cells[0].text.strip().lower()
                value = cells[1].text.strip()
                if "student:" in label:
                    student_data["name"] = value
                elif "ic/passport:" in label:
                    student_data["national_id"] = value
                elif "program:" in label:
                    student_data["program"] = value

        if not all(student_data.values()):
            logger.error(
                f"Unable to extract all required student information for student {std_no}"
            )
            return None, []

        student = Student(**student_data)

        # Extract enrollments and grades
        enrollments_with_grades = []
        current_enrollment = None
        current_grades = []

        for row in main_table.find_all("tr")[3:]:
            if "Term" in row.text:
                term_value = row.find_all("td")[1].text.strip()
                if re.match(r"\d{4}-\d{2}", term_value):
                    # Start of a new valid term
                    if current_enrollment:
                        current_enrollment.grades = current_grades
                        enrollments_with_grades.append(
                            (current_enrollment, current_grades)
                        )
                    current_enrollment = Enrollment(
                        std_no=std_no, term=term_value, credits=0
                    )
                    current_grades = []
            elif "Semester:" in row.text:
                if current_enrollment:
                    current_enrollment.semester = (
                        row.find_all("td")[1].text.strip().split(",")[0].strip()
                    )
            elif "Results:" in row.text:
                if current_enrollment:
                    gpa_cgpa_text = row.find_all("td")[1].text.strip()
                    gpa_text, cgpa_text = gpa_cgpa_text.split("/")
                    current_enrollment.gpa = self.clean_decimal(gpa_text.split(":")[1])
                    current_enrollment.cgpa = self.clean_decimal(
                        cgpa_text.split(":")[1]
                    )
            elif len(row.find_all("td")) == 10:  # Grade row
                cols = row.find_all("td")
                course_code = cols[1].text.strip()
                if course_code and course_code != "Code":  # Valid grade row
                    try:
                        grade_credits = int(self.clean_decimal(cols[5].text))
                        grade = Grade(
                            course_code=course_code,
                            course_name=cols[2].text.strip(),
                            grade=cols[4].text.strip(),
                            credits=grade_credits,
                        )
                        current_grades.append(grade)
                        if current_enrollment:
                            current_enrollment.credits += grade_credits
                    except (ValueError, IndexError) as e:
                        logger.warning(f"Error processing grade row: {e}")

        # Add the last enrollment and grades
        if current_enrollment:
            current_enrollment.grades = current_grades
            enrollments_with_grades.append((current_enrollment, current_grades))

        # Set the enrollments for the student
        student.enrollments = [enrollment for enrollment, _ in enrollments_with_grades]

        return student, enrollments_with_grades
