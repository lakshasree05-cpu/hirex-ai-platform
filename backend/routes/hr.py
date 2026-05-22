from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime

from database import get_db
import models, schemas

router = APIRouter(prefix="/api/hr", tags=["HR / Admin"])


@router.get("/dashboard/{hr_id}", response_model=schemas.HRDashboardStats)
def get_hr_dashboard(hr_id: int, db: Session = Depends(get_db)):
    total_jobs = db.query(func.count(models.Job.id)).filter(models.Job.created_by == hr_id).scalar()
    active_jobs = db.query(func.count(models.Job.id)).filter(
        models.Job.created_by == hr_id,
        models.Job.status == models.JobStatus.active
    ).scalar()
    total_candidates = db.query(func.count(models.Application.id)).scalar()
    shortlisted = db.query(func.count(models.Application.id)).filter(models.Application.is_shortlisted == True).scalar()

    return schemas.HRDashboardStats(
        total_jobs=total_jobs or 0,
        active_jobs=active_jobs or 0,
        total_candidates=total_candidates or 0,
        shortlisted=shortlisted or 0,
        hired_this_month=0,
    )


@router.post("/jobs", response_model=schemas.JobOut)
def create_job(payload: schemas.JobCreate, hr_id: int, db: Session = Depends(get_db)):
    job = models.Job(created_by=hr_id, **payload.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.get("/jobs", response_model=List[schemas.JobOut])
def list_jobs(hr_id: int, status: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(models.Job).filter(models.Job.created_by == hr_id)
    if status:
        q = q.filter(models.Job.status == status)
    return q.order_by(models.Job.created_at.desc()).all()


@router.patch("/jobs/{job_id}/status", response_model=dict)
def update_job_status(job_id: int, status: models.JobStatus, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    job.status = status
    db.commit()
    return {"message": "Job status updated"}


@router.get("/candidates", response_model=List[schemas.ApplicationOut])
def list_candidates(job_id: Optional[int] = None, shortlisted: Optional[bool] = None, db: Session = Depends(get_db)):
    q = db.query(models.Application)
    if job_id:
        q = q.filter(models.Application.job_id == job_id)
    if shortlisted is not None:
        q = q.filter(models.Application.is_shortlisted == shortlisted)
    return q.order_by(models.Application.overall_score.desc().nullslast()).all()


@router.post("/candidates/{application_id}/shortlist", response_model=dict)
def shortlist_candidate(application_id: int, db: Session = Depends(get_db)):
    app = db.query(models.Application).filter(models.Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.is_shortlisted = True
    app.status = "shortlisted"
    db.commit()

    notif = models.Notification(
        user_id=app.candidate_id,
        title="Congratulations! You've been shortlisted! 🎉",
        message="You have been shortlisted for the next stage. HR will contact you soon.",
        type="success",
    )
    db.add(notif)
    db.commit()
    return {"message": "Candidate shortlisted successfully"}


@router.get("/reports/{application_id}", response_model=schemas.CandidateReportOut)
def get_candidate_report(application_id: int, db: Session = Depends(get_db)):
    app = db.query(models.Application).filter(models.Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    results = db.query(models.TestResult).filter(
        models.TestResult.application_id == application_id
    ).order_by(models.TestResult.round_number).all()

    scores = [r.score for r in results if r.score is not None]
    overall = sum(scores) / len(scores) if scores else None

    strengths, weaknesses, tips = [], [], []
    for r in results:
        if r.score and r.score >= 85:
            strengths.append(f"Strong performance in {r.round_type}")
        elif r.score and r.score < 70:
            weaknesses.append(f"Needs improvement in {r.round_type}")
            tips.append(f"Practice more {r.round_type} exercises")

    return schemas.CandidateReportOut(
        candidate=app.candidate,
        application=app,
        rounds=results,
        overall_score=overall,
        rank=None,
        strengths=strengths,
        weaknesses=weaknesses,
        improvement_tips=tips,
    )
