from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random, string
from jose import JWTError, jwt
from passlib.context import CryptContext

from database import get_db
import models, schemas
import os
import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import HTTPException
# SMTP imports
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

SECRET_KEY = os.getenv("SECRET_KEY", "hirex-secret-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def generate_otp(length: int = 6) -> str:
    print(f"Generated OTP for {payload.email}: {otp}")
    return "".join(random.choices(string.digits, k=length))


# SMTP Email Sender
def send_otp_email(email: str, otp: str):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    if not smtp_user or not smtp_password:
        raise Exception("SMTP credentials missing")

    subject = "HireX Email Verification OTP"

    body = f"""
Your HireX verification OTP is:

{otp}

This OTP expires in 10 minutes.
"""

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()

        print(f"OTP email sent to {email}")

    except Exception as e:
        print("SMTP ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Email sending failed: {str(e)}"
        )


@router.post("/register", response_model=dict)
def register(
    payload: schemas.RegisterRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    existing = db.query(models.User).filter(models.User.email == payload.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    otp = generate_otp()
    otp_expires = datetime.utcnow() + timedelta(minutes=10)

    user = models.User(
        name=payload.name,
        email=payload.email,
        hashed_password=hash_password(payload.password),
        role=payload.role,
        otp_code=otp,
        otp_expires_at=otp_expires,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Send OTP Email in background
    background_tasks.add_task(send_otp_email, payload.email, otp)

    return {
        "message": "Registration successful. Please verify your email.",
        "user_id": user.id,
    }


@router.post("/verify-otp", response_model=schemas.TokenResponse)
def verify_otp(payload: schemas.VerifyOTPRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.otp_code != payload.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if user.otp_expires_at and datetime.utcnow() > user.otp_expires_at:
        raise HTTPException(status_code=400, detail="OTP expired")

    user.is_verified = True
    user.otp_code = None
    user.otp_expires_at = None

    db.commit()

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return schemas.TokenResponse(
        access_token=token,
        user_id=user.id,
        role=user.role,
        name=user.name,
    )


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account deactivated")

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return schemas.TokenResponse(
        access_token=token,
        user_id=user.id,
        role=user.role,
        name=user.name,
    )


@router.post("/resend-otp", response_model=dict)
def resend_otp(
    payload: schemas.ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = generate_otp()

    user.otp_code = otp
    user.otp_expires_at = datetime.utcnow() + timedelta(minutes=10)

    db.commit()

    # Resend OTP Email
    background_tasks.add_task(send_otp_email, payload.email, otp)

    return {"message": "OTP resent successfully"}


@router.post("/forgot-password", response_model=dict)
def forgot_password(
    payload: schemas.ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user:
        return {"message": "If that email exists, a reset link has been sent."}

    reset_token = create_access_token(
        {"sub": str(user.id), "type": "reset"},
        timedelta(hours=1),
    )

    # Send reset token through email
    background_tasks.add_task(send_otp_email, payload.email, reset_token)

    return {"message": "Password reset link sent to your email."}
