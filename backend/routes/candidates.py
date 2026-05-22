from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from database import get_db
import models, schemas

router = APIRouter(prefix="/api/candidates", tags=["Candidates"])


def get_candidate_or_404(candidate_id: int, db: Session) -> models.User:
    user = db.query(models.User).filter(
        models.User.id == candidate_id,
        models.User.role == models.UserRole.candidate
    ).first()
    if not user:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return user


@router.get("/dashboard/{candidate_id}", response_model=schemas.CandidateDashboardStats)
def get_dashboard(candidate_id: int, db: Session = Depends(get_db)):
    get_candidate_or_404(candidate_id, db)
    apps = db.query(models.Application).filter(models.Application.candidate_id == candidate_id).all()
    if not apps:
        return schemas.CandidateDashboardStats(rounds_completed=0, total_rounds=6, overall_score=None, rank=None, next_round="Aptitude Test")

    app = apps[0]
    results = db.query(models.TestResult).filter(
        models.TestResult.application_id == app.id,
        models.TestResult.status == models.RoundStatus.completed
    ).all()
    completed = len(results)
    avg_score = sum(r.score for r in results if r.score) / completed if completed else None

    round_names = ["Aptitude Test", "Reasoning Test", "Coding Test", "Typing Test", "Group Discussion", "AI Interview"]
    next_round = round_names[completed] if completed < 6 else None

    return schemas.CandidateDashboardStats(
        rounds_completed=completed,
        total_rounds=6,
        overall_score=avg_score,
        rank=None,
        next_round=next_round,
    )


@router.get("/{candidate_id}/results", response_model=List[schemas.TestResultOut])
def get_test_results(candidate_id: int, application_id: int, db: Session = Depends(get_db)):
    get_candidate_or_404(candidate_id, db)
    results = db.query(models.TestResult).filter(
        models.TestResult.application_id == application_id
    ).order_by(models.TestResult.round_number).all()
    return results


@router.post("/{candidate_id}/apply/{job_id}", response_model=schemas.ApplicationOut)
def apply_for_job(candidate_id: int, job_id: int, db: Session = Depends(get_db)):
    existing = db.query(models.Application).filter(
        models.Application.candidate_id == candidate_id,
        models.Application.job_id == job_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already applied for this job")

    application = models.Application(candidate_id=candidate_id, job_id=job_id)
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@router.post("/{candidate_id}/submit-test", response_model=dict)
def submit_test(candidate_id: int, payload: schemas.SubmitTestRequest, db: Session = Depends(get_db)):
    # Calculate score based on round type (simplified logic)
    score_map = {
        "aptitude": 85.0, "reasoning": 78.0, "coding": 92.0,
        "typing": 88.0, "group_discussion": 75.0, "ai_interview": None
    }
    score = score_map.get(payload.round_type.lower(), 80.0)

    result = models.TestResult(
        application_id=payload.application_id,
        round_type=payload.round_type,
        round_number=payload.round_number,
        score=score,
        status=models.RoundStatus.completed if score is not None else models.RoundStatus.in_progress,
        time_taken_seconds=payload.time_taken_seconds,
        tab_switches=payload.tab_switches,
        face_detected=payload.face_detected,
        answers_data=json.dumps(payload.answers),
        cheat_score=min(payload.tab_switches * 5.0, 100),
    )
    db.add(result)

    app = db.query(models.Application).filter(models.Application.id == payload.application_id).first()
    if app:
        app.current_round = payload.round_number + 1

    db.commit()
    return {"message": "Test submitted successfully", "score": score}


@router.put("/{candidate_id}/profile", response_model=dict)
def update_profile(candidate_id: int, payload: schemas.CandidateProfileUpdate, db: Session = Depends(get_db)):
    profile = db.query(models.CandidateProfile).filter(models.CandidateProfile.user_id == candidate_id).first()
    if not profile:
        profile = models.CandidateProfile(user_id=candidate_id)
        db.add(profile)

    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(profile, field, value)

    db.commit()
    return {"message": "Profile updated successfully"}
