from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import enum


class UserRole(str, enum.Enum):
    candidate = "candidate"
    hr = "hr"
    admin = "admin"


class RoundStatus(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"
    skipped = "skipped"


class JobStatus(str, enum.Enum):
    active = "active"
    closed = "closed"
    draft = "draft"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.candidate)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    otp_code = Column(String(6), nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)
    profile_pic = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    candidate_profile = relationship("CandidateProfile", back_populates="user", uselist=False)
    hr_profile = relationship("HRProfile", back_populates="user", uselist=False)
    applications = relationship("Application", back_populates="candidate")


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    phone = Column(String(20), nullable=True)
    city = Column(String(100), nullable=True)
    resume_url = Column(String(500), nullable=True)
    resume_text = Column(Text, nullable=True)
    skills = Column(Text, nullable=True)
    experience_years = Column(Float, default=0)
    education = Column(Text, nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="candidate_profile")


class HRProfile(Base):
    __tablename__ = "hr_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    company_name = Column(String(200), nullable=True)
    department = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="hr_profile")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    location = Column(String(200), nullable=True)
    job_type = Column(String(50), default="full_time")
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    status = Column(Enum(JobStatus), default=JobStatus.active)
    min_match_score = Column(Float, default=60.0)
    deadline = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    applications = relationship("Application", back_populates="job")
    test_rounds = relationship("JobTestRound", back_populates="job")


class JobTestRound(Base):
    __tablename__ = "job_test_rounds"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    round_type = Column(String(50))
    round_order = Column(Integer)
    is_required = Column(Boolean, default=True)
    time_limit_minutes = Column(Integer, default=60)
    pass_score = Column(Float, default=60.0)

    job = relationship("Job", back_populates="test_rounds")


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    candidate_id = Column(Integer, ForeignKey("users.id"))
    resume_match_score = Column(Float, nullable=True)
    is_eligible = Column(Boolean, default=True)
    is_shortlisted = Column(Boolean, default=False)
    current_round = Column(Integer, default=1)
    overall_score = Column(Float, nullable=True)
    status = Column(String(50), default="applied")
    applied_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    job = relationship("Job", back_populates="applications")
    candidate = relationship("User", back_populates="applications")
    test_results = relationship("TestResult", back_populates="application")


class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"))
    round_type = Column(String(50))
    round_number = Column(Integer)
    score = Column(Float, nullable=True)
    max_score = Column(Float, default=100)
    status = Column(Enum(RoundStatus), default=RoundStatus.pending)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    time_taken_seconds = Column(Integer, nullable=True)
    cheat_score = Column(Float, default=0)
    tab_switches = Column(Integer, default=0)
    face_detected = Column(Boolean, default=True)
    answers_data = Column(Text, nullable=True)
    ai_feedback = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    application = relationship("Application", back_populates="test_results")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(200))
    message = Column(Text)
    type = Column(String(50), default="info")
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
