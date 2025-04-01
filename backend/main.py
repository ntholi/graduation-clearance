import time
from datetime import datetime

from database import db_session, init_db
from database.models import (Enrollment, Grade, SignUpRequest,
                             SignUpRequestStatus, Student, User, UserRole)
from rich import print
from scrapper import Scrapper
from services.blocked import block_not_graduating
from services.cleanup import (delete_duplicate_requests,
                              delete_non_graduating_requests)
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
    print(f"Saving student {student.std_no}...")
    db_session.commit()


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

    student = db_session.query(Student).filter(Student.std_no == str(std_no)).first()
    if not student:
        raise ValueError(f"Student {std_no} not found")

    for enrollment, grades in enrollments_data:
        # Create a new enrollment object without the student relationship
        new_enrollment = Enrollment(
            std_no=student.std_no,
            term=enrollment.term,
            semester=enrollment.semester,
            gpa=enrollment.gpa,
            cgpa=enrollment.cgpa,
            credits=enrollment.credits
        )
        enrollments.append(new_enrollment)
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
        .filter(
            SignUpRequest.status == SignUpRequestStatus.pending,
        )
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
            try:
                student_details = scrapper.get_student_details(signup.std_no)
                student.nationality = student_details["Nationality"]
                student.gender = student_details["Sex"]
                student.date_of_birth = datetime.strptime(
                    student_details["Birthdate"], "%Y-%m-%d"
                )
            except Exception as e:
                print(f"Error getting student details for {signup.std_no}: {e}")
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


def update_grades(std_no: int):
    scrapper = Scrapper()
    _, enrollments_with_grades = scrapper.get_student_data(std_no)
    for enrollment_data, grades_data in enrollments_with_grades:
        existing_enrollment = (
            db_session.query(Enrollment)
            .filter(
                Enrollment.std_no == str(std_no),
                Enrollment.term == enrollment_data.term,
                Enrollment.semester == enrollment_data.semester,
            )
            .first()
        )

        if existing_enrollment:
            existing_enrollment.gpa = enrollment_data.gpa
            existing_enrollment.cgpa = enrollment_data.cgpa
            existing_enrollment.credits = enrollment_data.credits
        else:
            new_enrollment = Enrollment(
                std_no=std_no,
                term=enrollment_data.term,
                semester=enrollment_data.semester,
                gpa=enrollment_data.gpa,
                cgpa=enrollment_data.cgpa,
                credits=enrollment_data.credits,
            )
            db_session.add(new_enrollment)
            db_session.flush()
            existing_enrollment = new_enrollment

        for grade_data in grades_data:
            existing_grade = (
                db_session.query(Grade)
                .filter(
                    Grade.enrollment_id == existing_enrollment.id,
                    Grade.course_code == grade_data.course_code,
                )
                .first()
            )

            if existing_grade:
                existing_grade.course_name = grade_data.course_name
                existing_grade.grade = grade_data.grade
                existing_grade.credits = grade_data.credits
            else:
                new_grade = Grade(
                    enrollment_id=existing_enrollment.id,
                    course_code=grade_data.course_code,
                    course_name=grade_data.course_name,
                    grade=grade_data.grade,
                    credits=grade_data.credits,
                )
                db_session.add(new_grade)

    try:
        db_session.commit()
        print(f"Updated grades for student {std_no}")
    except Exception as e:
        db_session.rollback()
        print(f"Error updating grades for student {std_no}: {e}")


def refresh_student_enrollments(student_numbers: list[int]):
    """
    Scrapes transcripts for a list of student numbers, deletes existing enrollments,
    and re-saves the enrollments with their grades.
    
    Args:
        student_numbers: List of student numbers to process
    """
    scrapper = Scrapper()
    
    for i, std_no in enumerate(student_numbers):
        try:
            print(f"Processing student {i+1}/{len(student_numbers)}: {std_no}")
            
            # Fetch the student data and enrollments with grades
            _, enrollments_with_grades = scrapper.get_student_data(std_no)
            
            print('Doing', enrollments_with_grades)
            if not enrollments_with_grades:
                print(f"No data found for student {std_no}, skipping...")
                continue
                
            # Delete existing enrollments for this student
            existing_enrollments = (
                db_session.query(Enrollment)
                .filter(Enrollment.std_no == str(std_no))
                .all()
            )
            
            if existing_enrollments:
                print(f"Deleting {len(existing_enrollments)} existing enrollments for student {std_no}")
                for enrollment in existing_enrollments:
                    db_session.delete(enrollment)
                db_session.flush()
                
            # Save the new enrollments with grades
            batch_save_enrollments(db_session, std_no, enrollments_with_grades)
            
            print(f"Successfully refreshed enrollments for student {std_no}")
            
        except IntegrityError as e:
            db_session.rollback()
            print(f"Database integrity error for student {std_no}: {e}")
        except Exception as e:
            db_session.rollback()
            print(f"Unexpected error refreshing enrollments for student {std_no}: {e}")


def main():
    init_db()
    while True:
        # update_grades(901013975)
        approve_signup_requests()
        # update_saved_students()
        # delete_non_graduating_requests()
        # delete_duplicate_requests()
        print("Sleeping for 5 minutes...")
        time.sleep(60 * 5)


if __name__ == "__main__":
    main()
