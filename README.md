# KSkillAI360 — Post-Training Outcome Tracking & Intelligence Platform

**Tagline**: *"From Training Completion to Sustainable Employment"*  
**Smart India Hackathon 2026**: Problem Statement 26135

---

## Executive Overview

Training systems usually capture enrollment, attendance, assessments, and certification, but post-training outcomes are fragmented or incomplete. KaushalPulse is not another LMS or job portal — it is a **Post-Training Outcome Tracking & Intelligence Platform** operating as an outcome layer over existing skilling ecosystems (e.g. Skill India Digital Hub, LMS, NCS).

### Core 5-Action Framework
1. **TRACK**: What happened post-certification? (Longitudinal 30, 90, 180, 365 day follow-up)
2. **VERIFY**: Can we trust the employment outcome? (Direct HR verification & Outcome Confidence score 0-100 pts)
3. **MEASURE**: What is the quality of livelihood? (Career Pulse Index: wage growth, retention, job relevance)
4. **UNDERSTAND**: Why did outcomes succeed or fail? (AI Root Cause analysis & AI Skill Gap matrices)
5. **IMPROVE**: What should be changed next? (Closed-loop Cohort Before vs. After intervention comparison)

---

## Key Features & User Roles

### 1. Government / Program Admin (`/government/dashboard`)
- Macro analytics over 5,000 synthetic trainees.
- Longitudinal Outcome Funnel (Enrolled → Certified → Reported → Verified → 6M Retained).
- Provider Quality Benchmarking matrix highlighting that placement % != 6M retention quality.

### 2. Trainee — Rahul Sharma Persona (`/trainee/dashboard`)
- Outcome ID: **KP-10492** (Data Analytics & Visualization course).
- **Career Pulse Index (84/100 Healthy)** score breakdown.
- Visual Longitudinal Timeline (March 2026 to October 2026).
- Low-friction employment outcome update form (`/trainee/outcome`).

### 3. Employer Verification Portal (`/employer/dashboard`)
- Verification Inbox with candidate request cards.
- 1-click HR verification modal with interactive celebration confetti.
- Transparent Outcome Confidence calculation (Self Reported 40 pts → Employer Verified 90 pts).

### 4. Training Provider Intelligence (`/provider/dashboard`, `/provider/course/:id`)
- Deep course insights, retention curves, wage progression (+21%), and AI actionable recommendations.

### 5. AI Skill Gap & Root Cause Engines (`/ai/skill-gap`, `/ai/root-cause`)
- Compares curriculum skills taught against real regional labor market demand.
- Spotlights High Priority Gaps (e.g., Power BI Practical Projects).
- Synthesizes natural language root cause narratives and course modification directives.

### 6. Cohort Impact Comparison — HERO FEATURE (`/analytics/cohorts`)
- Side-by-side Before vs. After intervention comparison.
- Proves curriculum intervention jump (52% → 64% placement, 61% → 73% retention).

---

## Local Setup & Execution Guide

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Start Frontend App
```bash
cd frontend
npm run dev
```
Open browser at: `http://localhost:3000`

### 2. Start FastAPI Backend (Optional / Production API)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
Open API docs at: `http://localhost:8000/docs`

---

## Hackathon Presentation Golden Journey

To demonstrate end-to-end functionality to SIH judges:
1. Open **Judge Guide Mode** toggle in top navigation bar.
2. Step 1: Open **Government Impact Analytics** → filter by Data Analytics course to spot weak 6M retention.
3. Step 2: Open **AI Root Cause Analysis** → analyze Skill Mismatch (38%) barrier.
4. Step 3: Open **AI Skill Gap Engine** → inspect missing Power BI demand.
5. Step 4: Open **Cohort Impact Comparison** → view Before vs. After intervention jump.
6. Step 5: Switch to **Trainee Persona (Rahul Sharma)** → view 84/100 Career Pulse & Longitudinal Timeline.
7. Step 6: Switch to **Employer Verification Portal** → click "Verify Candidate" for Rahul Sharma and observe confidence jump to 90%.
