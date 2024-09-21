from datetime import datetime
from typing import List, Optional

from sqlalchemy import DECIMAL, TIMESTAMP, Boolean, ForeignKey, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func


class Base(DeclarativeBase):
    pass


class Student(Base):
    __tablename__ = "students"

    std_no: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[Optional[str]] = mapped_column(String)
    name: Mapped[Optional[str]] = mapped_column(String)
    national_id: Mapped[str] = mapped_column(String, nullable=False)
    program: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())

    enrollments: Mapped[List["Enrollment"]] = relationship(
        back_populates="student", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"Student(std_no={self.std_no}, user_id={self.user_id}, name={self.name}, national_id={self.national_id}, program={self.program}, created_at={self.created_at})"


class SignUpRequest(Base):
    __tablename__ = "signup_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[Optional[str]] = mapped_column(String)
    std_no: Mapped[int] = mapped_column(Integer, nullable=False)
    approved: Mapped[bool] = mapped_column(Boolean, default=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())

    def __repr__(self) -> str:
        return f"SignUp(id={self.id}, user_id={self.user_id}, std_no={self.std_no}, approved={self.approved}, name={self.name}, created_at={self.created_at})"


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
    grade: Mapped[str] = mapped_column(String(2), nullable=False)
    credits: Mapped[int] = mapped_column(Integer, nullable=False)

    enrollment: Mapped["Enrollment"] = relationship(back_populates="grades")

    def __repr__(self) -> str:
        return f"Grade(id={self.id}, enrollment_id={self.enrollment_id}, course_code={self.course_code}, course_name={self.course_name}, grade={self.grade}, credits={self.credits})"
