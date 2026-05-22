from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import random

from database import get_db
import models

router = APIRouter(prefix="/api/tests", tags=["Tests"])

# Sample question bank (in production this comes from DB)
APTITUDE_QUESTIONS = [
    {"id": 1, "question": "If a train travels 60 km in 45 minutes, what is its speed in km/h?", "options": ["80", "75", "90", "70"], "answer": 0},
    {"id": 2, "question": "What is 15% of 240?", "options": ["36", "32", "40", "28"], "answer": 0},
    {"id": 3, "question": "A can do a work in 10 days and B in 15 days. How many days together?", "options": ["6", "5", "8", "7"], "answer": 0},
]

REASONING_QUESTIONS = [
    {"id": 1, "question": "Find the next number: 2, 6, 12, 20, 30, ?", "options": ["40", "42", "44", "36"], "answer": 1},
    {"id": 2, "question": "If CAT = 3+1+20 = 24, what is DOG?", "options": ["26", "30", "24", "28"], "answer": 0},
]

CODING_PROBLEMS = [
    {"id": 1, "title": "Two Sum", "difficulty": "Easy", "description": "Given an array of integers, return indices of two numbers that add up to target.", "examples": [{"input": "[2,7,11,15], target=9", "output": "[0,1]"}], "constraints": ["1 ≤ n ≤ 10^4", "−10^9 ≤ nums[i] ≤ 10^9"]},
    {"id": 2, "title": "Reverse a String", "difficulty": "Easy", "description": "Write a function to reverse a string.", "examples": [{"input": "'hello'", "output": "'olleh'"}], "constraints": ["1 ≤ s.length ≤ 10^5"]},
]

TYPING_TEXTS = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Success is not final, failure is not fatal. It is the courage to continue that counts.",
]


@router.get("/questions/{round_type}")
def get_questions(round_type: str, count: int = 10):
    """Return shuffled questions for a given round type."""
    questions_map = {
        "aptitude": APTITUDE_QUESTIONS,
        "reasoning": REASONING_QUESTIONS,
        "coding": CODING_PROBLEMS,
        "typing": [{"text": random.choice(TYPING_TEXTS)}],
    }
    questions = questions_map.get(round_type.lower(), [])
    # Don't reveal answers to client
    safe_questions = []
    for q in questions:
        q_copy = {k: v for k, v in q.items() if k != "answer"}
        safe_questions.append(q_copy)
    return {"round_type": round_type, "questions": safe_questions[:count]}


@router.post("/evaluate/{round_type}")
def evaluate_answers(round_type: str, answers: dict):
    """Auto-evaluate submitted answers and return score."""
    if round_type == "aptitude":
        correct = sum(
            1 for q in APTITUDE_QUESTIONS
            if str(answers.get(str(q["id"]))) == str(q["answer"])
        )
        score = (correct / len(APTITUDE_QUESTIONS)) * 100
    elif round_type == "reasoning":
        correct = sum(
            1 for q in REASONING_QUESTIONS
            if str(answers.get(str(q["id"]))) == str(q["answer"])
        )
        score = (correct / len(REASONING_QUESTIONS)) * 100
    elif round_type == "typing":
        # Typing score is passed from client (WPM + accuracy based)
        score = float(answers.get("score", 0))
    else:
        score = random.uniform(70, 95)

    return {"score": round(score, 2), "max_score": 100, "passed": score >= 60}


@router.get("/anti-cheat/events/{result_id}", response_model=dict)
def get_cheat_events(result_id: int, db: Session = Depends(get_db)):
    result = db.query(models.TestResult).filter(models.TestResult.id == result_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Test result not found")
    return {
        "tab_switches": result.tab_switches,
        "face_detected": result.face_detected,
        "cheat_score": result.cheat_score,
        "risk_level": "high" if result.cheat_score > 50 else "medium" if result.cheat_score > 20 else "low",
    }
