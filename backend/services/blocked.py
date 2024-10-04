from database import db_session
from database.models import ClearanceRequest, ClearanceRequestStatus, GraduatingStudent


def block_not_graduating(std_no: int):
    is_graduating = (
        db_session.query(GraduatingStudent)
        .filter(GraduatingStudent.std_no == std_no)
        .first()
    )
    if not is_graduating:
        clearance_request = (
            db_session.query(ClearanceRequest)
            .filter(ClearanceRequest.std_no == std_no)
            .first()
        )
        if clearance_request:
            response = ClearanceRequest(
                std_no=std_no,
                status=ClearanceRequestStatus.pending,  # TODO: REMOVE THIS
                reason="Not Graduating",
            )
