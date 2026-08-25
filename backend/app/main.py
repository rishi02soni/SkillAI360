from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import datetime

from app.ai.skill_gap_engine import analyze_skill_gap
from app.ai.root_cause_engine import analyze_cohort_root_causes

app = FastAPI(
    title="SkillAI360 API Backend",
    description="Post-Training Outcome Tracking & Intelligence Platform (SIH 2026 #26135)",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TraineeOutcomeRequest(BaseModel):
    trainee_id: str
    status: str
    company_name: Optional[str] = None
    role_title: Optional[str] = None
    joining_date: Optional[str] = None
    employment_type: Optional[str] = "Full-time"
    salary_band: Optional[str] = None
    is_relevant: Optional[bool] = True
    non_placement_reason: Optional[str] = None

class VerificationUpdateRequest(BaseModel):
    status: str
    remarks: Optional[str] = None

@app.get("/")
def read_root():
    return {
        "app": "SkillAI360 API Backend",
        "tagline": "From Training Completion to Sustainable Employment",
        "status": "Healthy",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.get("/api/trainees/{outcome_id}")
def get_trainee(outcome_id: str):
    return {
        "outcome_id": outcome_id,
        "name": "Rishi Sharma",
        "email": "rishi.sharma@example.com",
        "course_name": "Data Analytics & Visualization",
        "provider_name": "SkillForward Institute",
        "career_pulse_score": 84,
        "pulse_status": "Healthy",
        "verification_status": "Employer Verified",
        "confidence_score": 90
    }

@app.post("/api/trainees/{outcome_id}/outcome")
def update_outcome(outcome_id: str, payload: TraineeOutcomeRequest):
    return {
        "message": "Outcome updated successfully",
        "outcome_id": outcome_id,
        "updated_status": payload.status,
        "confidence_score": 90 if payload.status in ["Employed", "Self-employed"] else 60
    }

@app.get("/api/analytics/overview")
def get_analytics_overview():
    return {
        "total_trainees": 5000,
        "certified_rate": 92.4,
        "reported_employment_rate": 70.1,
        "verified_employment_rate": 58.0,
        "retention_6m_rate": 66.4,
        "avg_wage_growth": 18.2
    }

@app.post("/api/ai/skill-gap")
def run_skill_gap_analysis(course_id: str = "c-da-01"):
    taught = ["Excel Fundamentals", "SQL Queries", "Python Basics", "Statistical Analysis"]
    demanded = ["SQL Queries", "Python Basics", "Power BI Practical Projects", "AWS/Cloud Deployment", "Business Communication"]
    return analyze_skill_gap(taught, demanded)

@app.post("/api/ai/root-cause")
def run_root_cause_analysis():
    reasons = [
        {"barrier": "Skill gap", "percentage": 38, "count": 25},
        {"barrier": "Salary mismatch", "percentage": 24, "count": 16},
        {"barrier": "Interview difficulty", "percentage": 18, "count": 12},
        {"barrier": "Location", "percentage": 12, "count": 8},
        {"barrier": "Other", "percentage": 8, "count": 6},
    ]
    return analyze_cohort_root_causes(reasons)
