from sqlalchemy import (
    DECIMAL,
    JSON,
    TIMESTAMP,
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    create_engine,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base = declarative_base()


class Student(Base):
    __tablename__ = "students"
    std_no = Column(Integer, primary_key=True)
    user_id = Column(String)
    name = Column(String)
    national_id = Column(String, nullable=False)
    program = Column(String, nullable=False)
    email = Column(String, unique=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User")


class SignUp(Base):
    __tablename__ = "signups"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String)
    std_no = Column(Integer, nullable=False)
    approved = Column(Boolean, default=False)
    name = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User")


class Enrollment(Base):
    __tablename__ = "enrollments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    std_no = Column(
        Integer, ForeignKey("students.std_no", ondelete="CASCADE"), nullable=False
    )
    term = Column(String, nullable=False)
    semester = Column(String, nullable=False)
    gpa = Column(DECIMAL(3, 2), nullable=False)
    cgpa = Column(DECIMAL(3, 2), nullable=False)
    credits = Column(Integer, nullable=False)

    student = relationship("Student")


class Grade(Base):
    __tablename__ = "grades"
    id = Column(Integer, primary_key=True, autoincrement=True)
    std_no = Column(
        Integer, ForeignKey("students.std_no", ondelete="CASCADE"), nullable=False
    )
    course_code = Column(String, nullable=False)
    course_name = Column(String, nullable=False)
    grade = Column(String(2), nullable=False)
    credits = Column(Integer, nullable=False)

    student = relationship("Student")
