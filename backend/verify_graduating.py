from typing import List, Tuple

from database import db_session
from database.models import Enrollment, Grade, GraduatingStudent
from rich import print
from scrapper import Scrapper


def get_graduating_students():
    print("Loading students...")
    std_numbers = db_session.query(GraduatingStudent.std_no).all()
    return std_numbers


def verify_repeat_courses(std_no: int):
    scrapper = Scrapper()
    _, enrollments = scrapper.get_student_data(std_no)
    failed_courses: List[Grade] = []
    failing_grade = ["F", "ANN", "DEF", "PP"]
    for _, grades in enrollments:
        for grade in grades:
            if grade.grade in failing_grade:
                failed_courses.append(grade)
            if (
                grade.course_code in [it.course_code for it in failed_courses]
                and grade.grade not in failing_grade
            ):
                failed_courses = [
                    it for it in failed_courses if it.course_code != grade.course_code
                ]
    return failed_courses


def main():
    students = get_graduating_students()
    for student in students:
        grades = verify_repeat_courses(student.std_no)
        if len(grades) > 0:
            print(f"Student {student.std_no}: {grades}")


if __name__ == "__main__":
    main()
