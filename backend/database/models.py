from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlalchemy import DECIMAL, TIMESTAMP, Boolean
from sqlalchemy import Enum as SQLAlchemyEnum
from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func


class Base(DeclarativeBase):
    pass


class UserRole(Enum):
    student = "student"
    registry = "registry"
    finance = "finance"
    faculty = "faculty"
    admin = "admin"


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    role: Mapped[UserRole] = mapped_column(SQLAlchemyEnum(UserRole))


class Student(Base):
    __tablename__ = "students"

    std_no: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[Optional[str]] = mapped_column(String)
    name: Mapped[Optional[str]] = mapped_column(String)
    national_id: Mapped[str] = mapped_column(String, nullable=False)
    program: Mapped[str] = mapped_column(String, nullable=False)
    gender: Mapped[str] = mapped_column(String, nullable=False)
    nationality: Mapped[str] = mapped_column(String, nullable=False)
    date_of_birth: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())

    enrollments: Mapped[List["Enrollment"]] = relationship(
        back_populates="student", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"Student(std_no={self.std_no}, user_id={self.user_id}, name={self.name}, national_id={self.national_id}, program={self.program}, created_at={self.created_at})"


class GraduatingStudent(Base):
    __tablename__ = "graduating_students"

    std_no: Mapped[int] = mapped_column(Integer, primary_key=True)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())


class ClearanceRequest(Base):
    __tablename__ = "clearance_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    std_no: Mapped[int] = mapped_column(
        Integer, ForeignKey("students.std_no", ondelete="CASCADE"), nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())


class DepartmentEnum(Enum):
    finance = "finance"
    library = "library"
    resource = "resource"
    it = "it"
    admin = "admin"


class ClearanceResponse(Base):
    __tablename__ = "clearance_responses"

    clearance_request_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("clearance_requests.id", ondelete="CASCADE"),
        primary_key=True,
    )
    blocked_student_id: Mapped[Optional[str]] = mapped_column(
        String(21), ForeignKey("blocked_students.id", ondelete="SET NULL")
    )
    responder: Mapped[DepartmentEnum] = mapped_column(
        SQLAlchemyEnum(DepartmentEnum), primary_key=True
    )
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    created_by: Mapped[str] = mapped_column(
        String(21), ForeignKey("users.id"), nullable=False
    )

    def __repr__(self) -> str:
        return f"ClearanceResponse(clearance_request_id={self.clearance_request_id}, blocked_student_id={self.blocked_student_id}, responder={self.responder}, created_at={self.created_at}, created_by={self.created_by})"


class BlockedStudentStatus(Enum):
    blocked = "blocked"
    unblocked = "unblocked"


class BlockedStudent(Base):
    __tablename__ = "blocked_students"

    id: Mapped[str] = mapped_column(String(21), primary_key=True)
    std_no: Mapped[str] = mapped_column(String(9), nullable=False)
    department: Mapped[DepartmentEnum] = mapped_column(
        SQLAlchemyEnum(DepartmentEnum), nullable=False
    )
    reason: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[BlockedStudentStatus] = mapped_column(
        SQLAlchemyEnum(BlockedStudentStatus),
        nullable=False,
        default=BlockedStudentStatus.blocked,
    )
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    created_by: Mapped[str] = mapped_column(
        String(21), ForeignKey("users.id"), nullable=False
    )
    unblocked_at: Mapped[Optional[datetime]] = mapped_column(TIMESTAMP)
    unblocked_by: Mapped[Optional[str]] = mapped_column(
        String(21), ForeignKey("users.id")
    )

    def __repr__(self) -> str:
        return f"BlockedStudent(id={self.id}, std_no={self.std_no}, department={self.department}, status={self.status}, created_at={self.created_at}, created_by={self.created_by}, unblocked_at={self.unblocked_at}, unblocked_by={self.unblocked_by})"


class SignUpRequestStatus(Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class SignUpRequest(Base):
    __tablename__ = "signup_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[Optional[str]] = mapped_column(String)
    std_no: Mapped[int] = mapped_column(Integer, nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[SignUpRequestStatus] = mapped_column(
        SQLAlchemyEnum(SignUpRequestStatus),
        nullable=False,
        default=SignUpRequestStatus.pending,
    )
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())

    def __repr__(self) -> str:
        return f"SignUp(id={self.id}, user_id={self.user_id}, std_no={self.std_no}, status={self.status}, name={self.name}, created_at={self.created_at})"


class Enrollment(Base):
    __tablename__ = "enrollments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    std_no: Mapped[int] = mapped_column(
        Integer, ForeignKey("students.std_no", ondelete="CASCADE"), nullable=False
    )
    term: Mapped[str] = mapped_column(String, nullable=False)
    semester: Mapped[str] = mapped_column(String, nullable=False)
    gpa: Mapped[float] = mapped_column(DECIMAL(3, 2), nullable=False)
    cgpa: Mapped[float] = mapped_column(DECIMAL(3, 2), nullable=False)
    credits: Mapped[int] = mapped_column(Integer, nullable=False)

    student: Mapped["Student"] = relationship(back_populates="enrollments")
    grades: Mapped[List["Grade"]] = relationship(
        back_populates="enrollment", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"Enrollment(id={self.id}, std_no={self.std_no}, term={self.term}, semester={self.semester}, gpa={self.gpa}, cgpa={self.cgpa}, credits={self.credits})"


class Grade(Base):
    __tablename__ = "grades"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    enrollment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("enrollments.id", ondelete="CASCADE"), nullable=False
    )
    course_code: Mapped[str] = mapped_column(String, nullable=False)
    course_name: Mapped[str] = mapped_column(String, nullable=False)
    grade: Mapped[str] = mapped_column(String(3), nullable=False)
    credits: Mapped[int] = mapped_column(Integer, nullable=False)

    enrollment: Mapped["Enrollment"] = relationship(back_populates="grades")

    def __repr__(self) -> str:
        return f"Grade(id={self.id}, enrollment_id={self.enrollment_id}, course_code={self.course_code}, course_name={self.course_name}, grade={self.grade}, credits={self.credits})"
