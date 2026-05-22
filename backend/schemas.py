from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime
from models import UserRole, RoundStatus, JobStatus


# ── Auth ──────────────────────────────────────────────
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.candidate

    @field_validator("password")
    @classmethod
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    role: UserRole
    name: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


# ── User ──────────────────────────────────────────────
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: UserRole


class UserOut(UserBase):
    id: int
    is_verified: bool
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class CandidateProfileUpdate(BaseModel):
    phone: Optional[str] = None
    city: Optional[str] = None
    skills: Optional[str] = None
    experience_years: Optional[float] = None
    education: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None


# ── Jobs ──────────────────────────────────────────────
class JobCreate(BaseModel):
    title: str
    description: Optional[str] = None
    requirements: Optional[str] = None
    location: Optional[str] = None
    job_type: str = "full_time"
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    min_match_score: float = 60.0
    deadline: Optional[datetime] = None


class JobOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    location: Optional[str]
    job_type: str
    salary_min: Optional[float]
    salary_max: Optional[float]
    status: JobStatus
    created_at: datetime

    class Config:
        from_attributes = True


# ── Applications ──────────────────────────────────────
class ApplicationOut(BaseModel):
    id: int
    job_id: int
    candidate_id: int
    resume_match_score: Optional[float]
    is_eligible: bool
    is_shortlisted: bool
    current_round: int
    overall_score: Optional[float]
    status: str
    applied_at: datetime

    class Config:
        from_attributes = True


# ── Test Results ──────────────────────────────────────
class TestResultOut(BaseModel):
    id: int
    round_type: str
    round_number: int
    score: Optional[float]
    max_score: float
    status: RoundStatus
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    time_taken_seconds: Optional[int]
    cheat_score: float
    ai_feedback: Optional[str]

    class Config:
        from_attributes = True


class SubmitTestRequest(BaseModel):
    application_id: int
    round_type: str
    round_number: int
    answers: dict
    time_taken_seconds: int
    tab_switches: int = 0
    face_detected: bool = True


# ── Reports ───────────────────────────────────────────
class CandidateReportOut(BaseModel):
    candidate: UserOut
    application: ApplicationOut
    rounds: List[TestResultOut]
    overall_score: Optional[float]
    rank: Optional[int]
    strengths: List[str]
    weaknesses: List[str]
    improvement_tips: List[str]


# ── Notifications ─────────────────────────────────────
class NotificationOut(BaseModel):
    id: int
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Dashboard stats ───────────────────────────────────
class HRDashboardStats(BaseModel):
    total_jobs: int
    active_jobs: int
    total_candidates: int
    shortlisted: int
    hired_this_month: int


class CandidateDashboardStats(BaseModel):
    rounds_completed: int
    total_rounds: int
    overall_score: Optional[float]
    rank: Optional[int]
    next_round: Optional[str]
