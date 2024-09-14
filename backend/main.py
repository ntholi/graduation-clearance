from database import db_session, init_db
from database.models import SignUp
from rich import print
from scrapper import Scrapper


def read_student(std_no: int):
    scrapper = Scrapper()
    scrapper.get_student_data(std_no)


def approve_signups():
    # signups = db_session.query(SignUp).filter(SignUp.approved == False).all()
    # for signup in signups:
    #     print(signup)
    scrapper = Scrapper()
    student, enrollments = scrapper.get_student_data(901013857)
    print(student)
    print(enrollments)


def main():
    init_db()
    approve_signups()


if __name__ == "__main__":
    main()
