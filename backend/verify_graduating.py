from typing import List

from database import db_session
from database.models import Grade, GraduatingStudent
from rich import print
from rich.console import Console
from rich.table import Table
from scrapper import Scrapper

console = Console()


def get_graduating_students():
    print("Loading students...")
    std_numbers = db_session.query(GraduatingStudent.std_no).all()
    return std_numbers


def verify_repeat_courses(std_no: int):
    scrapper = Scrapper()
    _, enrollments = scrapper.get_student_data(std_no)

    failing_grades = {"F", "ANN", "DEF", "PP"}

    failed_courses: List[Grade] = []
    for _, grades in enrollments:
        for grade in grades:
            if grade.grade in failing_grades:
                failed_courses.append(grade)

    passed_course_names = set()
    for _, grades in enrollments:
        for grade in grades:
            if grade.grade not in failing_grades:
                passed_course_names.add(grade.course_name.lower())

    remaining_failed_courses = []
    for grade in failed_courses:
        if grade.course_name.lower() not in passed_course_names:
            remaining_failed_courses.append(grade)

    return remaining_failed_courses


def print_in_table(failed_students: list[tuple[int, List[Grade]]]):
    table = Table(title="Failed Students")
    table.add_column("No.")
    table.add_column("Student Number", style="cyan")
    table.add_column("Failed Courses", style="yellow")
    for i, [student, grades] in enumerate(failed_students):
        grade_name = ", ".join(
            [f"{it.course_code}: {it.course_name} ({it.grade})" for it in grades]
        )
        table.add_row(str(i + 1), str(student), grade_name)
    console.print(table)


def main():
    students = get_graduating_students()
    failed_students: list[tuple[int, List[Grade]]] = []
    for i, student in enumerate(students):
        print(f"Verifying student {i + 1} of {len(students)}")
        grades = verify_repeat_courses(student.std_no)
        if len(grades) > 0:
            failed_students.append((student.std_no, grades))

    print_in_table(failed_students)


if __name__ == "__main__":
    main()
