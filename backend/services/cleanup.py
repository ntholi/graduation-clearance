from database import db_session
from database.models import ClearanceRequest, GraduatingStudent


def delete_non_graduating_requests():
    clearance_requests = db_session.query(ClearanceRequest).all()
    graduating_students = db_session.query(GraduatingStudent).all()
    std_numbers = [student.std_no for student in graduating_students]
    for clearance_request in clearance_requests:
        if clearance_request.std_no not in std_numbers:
            print(f"Deleting clearance request for {clearance_request.std_no}")
            db_session.delete(clearance_request)
    db_session.commit()
    print("Done")
