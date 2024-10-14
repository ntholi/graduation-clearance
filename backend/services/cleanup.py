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


def delete_duplicate_requests():
    clearance_requests = (
        db_session.query(ClearanceRequest)
        .order_by(ClearanceRequest.std_no, ClearanceRequest.created_at)
        .all()
    )

    seen_std_nos = set()
    duplicate_requests = []

    for request in clearance_requests:
        if request.std_no in seen_std_nos:
            duplicate_requests.append(request)
        else:
            seen_std_nos.add(request.std_no)

    # Delete duplicate requests
    for duplicate in duplicate_requests:
        print(
            f"Deleting duplicate clearance request for student {duplicate.std_no} (ID: {duplicate.id})"
        )
        db_session.delete(duplicate)

    db_session.commit()
    print(f"Deleted {len(duplicate_requests)} duplicate clearance requests")
