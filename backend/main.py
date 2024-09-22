from ast import Tuple

from database import db_session, init_db
from database.models import (
    Enrollment,
    Grade,
    SignUpRequest,
    SignUpRequestStatus,
    Student,
)
from rich import print
from scrapper import Scrapper


def read_student(std_no: int):
    scrapper = Scrapper()
    scrapper.get_student_data(std_no)


def save_student(student: Student):
    existing_student = (
        db_session.query(Student).filter(Student.std_no == student.std_no).first()
    )
    if existing_student:
        existing_student.user_id = student.user_id
        existing_student.name = student.name
        existing_student.national_id = student.national_id
        existing_student.program = student.program
    else:
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


def approve_signup_requests():
    requests = (
        db_session.query(SignUpRequest)
        .filter(SignUpRequest.status == SignUpRequestStatus.pending)
        .all()
    )
    print(f"Found {len(requests)} requests to approve")
    scrapper = Scrapper()
    for signup in requests:
        student, enrollments = scrapper.get_student_data(signup.std_no)
        student.user_id = signup.user_id
        save_student(student)
        for enrollment in enrollments:
            save_enrollment(enrollment)
        signup.status = SignUpRequestStatus.approved
        db_session.commit()


def main():
    init_db()
    approve_signup_requests()


if __name__ == "__main__":
    main()
