import time
from datetime import datetime

from database import db_session, init_db
from database.models import (
    Enrollment,
    Grade,
    SignUpRequest,
    SignUpRequestStatus,
    Student,
    User,
    UserRole,
)
from rich import print
from scrapper import Scrapper
from services.blocked import block_not_graduating
from services.cleanup import delete_non_graduating_requests
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, scoped_session


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


def mark_user_as_student(user_id: str | None):
    user = db_session.query(User).filter(User.id == user_id).first()
    if user:
        user.role = UserRole.student
        db_session.commit()


def batch_save_enrollments(
    session: scoped_session[Session],
    std_no: int,
    enrollments_data: list[tuple[Enrollment, list[Grade]]],
):
    enrollments = []
    all_grades = []

    for enrollment, grades in enrollments_data:
        enrollment.std_no = std_no
        enrollments.append(enrollment)
        all_grades.extend(grades)

    session.add_all(enrollments)
    session.flush()

    for enrollment, (_, grades) in zip(enrollments, enrollments_data):
        for grade in grades:
            grade.enrollment_id = enrollment.id

    session.add_all(all_grades)
    session.commit()

    print(
        f"Saved {len(enrollments)} enrollments with {len(all_grades)} grades for student {std_no}"
    )


def approve_signup_requests():
    requests = (
        db_session.query(SignUpRequest)
        .filter(SignUpRequest.status == SignUpRequestStatus.pending)
        .all()
    )
    print(f"Found {len(requests)} requests to approve")
    scrapper = Scrapper()
    for i, signup in enumerate(requests):
        try:
            print(f"Processing signup request {i+1}/{len(requests)}")
            student, enrollments = scrapper.get_student_data(signup.std_no)
            program = scrapper.get_student_program(signup.std_no)
            if program:
                student.program = program
            student.user_id = signup.user_id
            student_details = scrapper.get_student_details(signup.std_no)
            student.nationality = student_details["Nationality"]
            student.gender = student_details["Sex"]
            student.date_of_birth = datetime.strptime(
                student_details["Birthdate"], "%Y-%m-%d"
            )
            save_student(student)
            mark_user_as_student(signup.user_id)
            batch_save_enrollments(db_session, student.std_no, enrollments)

            signup.status = SignUpRequestStatus.approved
            db_session.commit()
            print(f"Approved signup request for {signup.std_no}")
        except IntegrityError as e:
            db_session.rollback()
            print(f"Database integrity error for {signup.std_no}: {e}")
        except Exception as e:
            db_session.rollback()
            print(f"Unexpected error approving signup request for {signup.std_no}: {e}")


def update_saved_students():
    students = db_session.query(Student).filter(Student.gender == None).all()
    scrapper = Scrapper()
    for i, student in enumerate(students):
        try:
            print(f"Updating student {i+1}/{len(students)}")
            student_details = scrapper.get_student_details(student.std_no)
            program_name = scrapper.get_student_program(student.std_no)
            if program_name:
                student.program = program_name
            student.nationality = student_details["Nationality"]
            student.gender = student_details["Sex"]
            date_of_birth = student_details["Birthdate"]
            if date_of_birth:
                student.date_of_birth = datetime.strptime(date_of_birth, "%Y-%m-%d")
            db_session.commit()
        except IntegrityError as e:
            db_session.rollback()
            print(f"Database integrity error for {student.std_no}: {e}")
        except Exception as e:
            db_session.rollback()
            print(f"Unexpected error updating student {student.std_no}: {e}")


def main():
    init_db()
    while True:
        approve_signup_requests()
        # update_saved_students()
        # delete_non_graduating_requests()
        print("Sleeping for 10 minutes...")
        time.sleep(60 * 10)


if __name__ == "__main__":
    main()
