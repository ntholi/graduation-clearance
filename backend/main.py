from ast import Tuple

from database import db_session, init_db
from database.models import Enrollment, Grade, SignUp, Student
from rich import print
from scrapper import Scrapper


def read_student(std_no: int):
    scrapper = Scrapper()
    scrapper.get_student_data(std_no)


def save_student(student: Student):
    db_session.add(student)
    db_session.commit()
    print(f"Student {student.std_no} saved")


def save_enrollment(data: tuple[Enrollment, list[Grade]]):
    enrollment, grades = data
    db_session.add(enrollment)
    db_session.commit()
    for grade in grades:
        grade.enrollment_id = enrollment.id
        db_session.add(grade)
    db_session.commit()
    print(f"Enrollment {enrollment.id} saved")


def approve_signups():
    signups = db_session.query(SignUp).filter(SignUp.approved == True).all()
    scrapper = Scrapper()
    for signup in signups:
        student, enrollments = scrapper.get_student_data(signup.std_no)
        student.user_id = signup.user_id
        save_student(student)
        for enrollment in enrollments:
            save_enrollment(enrollment)


def main():
    init_db()
    approve_signups()


if __name__ == "__main__":
    main()
