# SkillAI360 — Post-Training Outcome Tracking & Intelligence Platform

**Tagline**: *"From Training Completion to Sustainable Employment"*  

---  

##  Problem

Current skilling systems effectively capture:

```text
Enrollment
   ↓
Training
   ↓
Assessment
   ↓
Certification
```

But the critical question comes after certification:

- Did the trainee actually get a job?
- Is the job related to the training?
- Is the trainee still employed after 6 or 12 months?
- Has their salary improved?
- Did they become self-employed or join an apprenticeship?
- Why did some trainees remain unemployed?
- Which skills are missing?
- Which training programmes are creating sustainable outcomes?

### The core problem

> **Training completion is not the same as livelihood improvement.**

 SkillAI360 addresses this post-training outcome gap.

---

# 💡 Our Solution

## SkillAI360 — The Outcome Intelligence Platform

SkillAI360 works as a **post-training outcome layer** over existing skilling and employment ecosystems.

Instead of stopping at certification or placement, SkillAI360 continuously follows the trainee's journey:

```text
TRAIN
  ↓
CERTIFY
  ↓
TRACK
  ↓
VERIFY
  ↓
MEASURE
  ↓
UNDERSTAND
  ↓
INTERVENE
  ↓
RE-MEASURE
  ↓
IMPROVE
```

---

# 🔥 Key Features

### 1. Longitudinal Outcome Tracking

Track trainee outcomes over time:

- Employment
- Self-employment
- Apprenticeship
- Unemployment
- Retention
- Wage progression
- Job relevance
- Career progression

Follow-ups can be scheduled at:

```text
30 Days
90 Days
180 Days
365 Days
```

---

### 2. Consent-Based Outcome ID

Each trainee receives a persistent **Outcome ID** that allows their post-training journey to be tracked even when contact details, locations or employers change.

Example:

```text
Outcome ID: KP-10492
```

Privacy-first design ensures that sensitive information is only used with appropriate consent.

---

### 3. Employer Verification

Employment outcomes are not treated as a simple yes/no value.

A verification model distinguishes:

```text
Self Reported
      ↓
Employer Verified
      ↓
Repeatedly Confirmed
```

This improves the reliability of outcome data.

---

### 4. Career Pulse

A prototype outcome-health indicator that combines:

- Employment
- Retention
- Job relevance
- Wage growth
- Skill progress

Example:

```text
Career Pulse
84 / 100
Healthy
```

---

### 5. Skill Gap Intelligence

SkillAI360 compares:

```text
Skills Taught
      +
Trainee Skills
      +
Job Market Requirements
      ↓
Skill Gap Analysis
```

Example:

```text
Training:
Excel
SQL
Python

Market Demand:
SQL
Python
Power BI
Cloud
Communication

Detected Gaps:
🔴 Power BI
🟠 Communication
🟡 Cloud
```

---

### 6. Root-Cause Analysis

SkillAI360 identifies why trainees are not transitioning successfully into employment.

Example:

```text
Skill Gap              34%
Location Mismatch      21%
Salary Mismatch        17%
Interview Readiness    14%
Other                  14%
```

---

### 7. Intervention Recommendation

The platform doesn't stop at identifying a problem.

Example:

```text
Detected Problem:
Power BI Skill Gap

Recommended Intervention:
• Add practical Power BI module
• Industry-based project
• Mock interview preparation
```

---

### 8. Cohort Impact Measurement

Compare outcomes before and after an intervention.

```text
                BEFORE      AFTER

Placement         52%        64%
6M Retention      61%        73%
```

This enables a closed-loop improvement process:

> **Identify → Intervene → Measure → Improve**

> **Note:** Prototype comparisons use synthetic demo data and do not claim causal impact.

---


## Executive Overview

Training systems usually capture enrollment, attendance, assessments, and certification, but post-training outcomes are fragmented or incomplete. SkillAI360 is not another LMS or job portal — it is a **Post-Training Outcome Tracking & Intelligence Platform** operating as an outcome layer over existing skilling ecosystems (e.g. Skill India Digital Hub, LMS, NCS).

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





# 🧠 Why AAGEY is Different

AAGEY is **not**:

- another LMS
- another job portal
- another certification platform
- another basic analytics dashboard

Instead, it focuses on the missing post-training outcome layer.

### Existing ecosystem

```text
Training
   ↓
Certification
   ↓
Job Opportunity
```

### AAGEY

```text
Training
   ↓
Certification
   ↓
Employment
   ↓
Verification
   ↓
Retention
   ↓
Wage Growth
   ↓
Job Relevance
   ↓
Skill Gaps
   ↓
Intervention
   ↓
Outcome Improvement
```

---

# 🎯 Target Users

## 👨‍🎓 Trainees

- View career outcome
- Update employment status
- Track job relevance
- Identify skill gaps
- Receive recommended interventions

## 🏫 Training Providers

- Monitor course outcomes
- Identify skill gaps
- Analyse non-placement reasons
- Compare cohorts
- Improve curriculum

## 🏛 Government / Programme Administrators

- Monitor district/course/provider outcomes
- Measure retention
- Track wage progression
- Compare programmes
- Support evidence-based policy decisions

## 🏢 Employers

- Verify employment
- Confirm job role
- Support reliable outcome data

---

# 🏗️ System Architecture

```text
             EXISTING DATA SOURCES
   ┌────────────┬────────────┬─────────────┐
   │ Training   │ Job Market │ Employers   │
   │ Providers  │ Data       │             │
   └──────┬─────┴─────┬──────┴──────┬──────┘
          └────────────┼─────────────┘
                       ↓
              ┌─────────────────┐
              │     AAGEY       │
              │ Outcome Engine  │
              └────────┬────────┘
                       ↓
       ┌───────────────┼────────────────┐
       ↓               ↓                ↓
  Trainee Data    Verification      Follow-ups
       ↓               ↓                ↓
       └───────────────┼────────────────┘
                       ↓
               Analytics Engine
                       ↓
              Skill Gap Analysis
                       ↓
              Intervention Engine
                       ↓
      ┌────────────────┼────────────────┐
      ↓                ↓                ↓
   Trainee          Provider         Government
 Dashboard         Dashboard         Dashboard
```

---

# 🛠️ Technology Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Lucide Icons

### Backend
- Python
- FastAPI
- Pydantic

### Database
- PostgreSQL
- Supabase

### Analytics
- Python
- Pandas
- scikit-learn

### Authentication
- Supabase Auth

### Deployment
- Vercel
- Render / Railway
- Supabase

---

# 📂 Project Structure

```text
AAGEY/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── data/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── ai/
│   │   └── db/
│   └── requirements.txt
│
├── database/
│   ├── schema/
│   ├── seed/
│   └── migrations/
│
├── docs/
│
├── .env.example
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# Backend Setup

Open another terminal:

```bash
cd backend
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

# 🔐 Environment Variables

Create a `.env` file.

Example:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

DATABASE_URL=your_database_url

LLM_API_KEY=your_llm_api_key
```

> For demo mode, external AI APIs can be skipped and the application can use deterministic fallback logic.

---

# 👤 Demo Accounts

The project supports demo role-based access.

```text
Trainee
Provider
Government
Employer
```

Example demo trainee:

```text
Name: Rahul Sharma
Outcome ID: KP-10492
Course: Data Analytics
District: Bhilai
Career Pulse: 84/100
```

---

# 🧪 Prototype Data

The hackathon prototype uses **synthetic demo data** for trainee, employment and employer records.

This allows the platform to demonstrate:

- employment tracking
- retention analysis
- skill-gap detection
- root-cause analysis
- employer verification
- cohort comparison

without exposing real personal information.

> Synthetic prototype data must not be presented as actual government statistics or real employment outcomes.

---

# 🔄 Core Demo Flow

The main hackathon demonstration follows one trainee journey:

```text
Training Completed
      ↓
Certified
      ↓
No Employment
      ↓
Follow-up
      ↓
Skill Gap Detected
      ↓
Power BI Recommended
      ↓
Employment Obtained
      ↓
Employer Verified
      ↓
6-Month Retention
      ↓
Career Pulse Updated
      ↓
Cohort Impact Measured
```

---

# 🔮 Future Scope

### Phase 1 — MVP
Working web platform with synthetic data.

### Phase 2 — Pilot
Real training providers, real consent-based follow-ups and employer verification.

### Phase 3 — Integration
Integration with existing skilling and employment ecosystems through APIs.

### Phase 4 — Scale
State and national-level outcome analytics, digital skill/employment passport and evidence-based programme planning.

---

# 🔐 Privacy & Security

AAGEY follows a privacy-conscious approach:

- Consent-based data collection
- Pseudonymous Outcome IDs
- Role-based access control
- Minimum necessary data
- Verification status
- Audit trail
- No unnecessary exposure of sensitive information

---

# 📊 Expected Impact

AAGEY aims to help stakeholders move from:

```text
"How many people did we train?"
```

to:

```text
"How many people achieved sustainable employment,
how long did they stay employed,
how did their livelihood progress,
and what should we improve?"
```

### Expected benefits

- Better quality employment outcome data
- Improved provider accountability
- Better curriculum alignment with industry demand
- Improved retention and wage outcomes
- Evidence-based programme decisions
- Better resource allocation

---

# 🧩 Future Integration Possibilities

AAGEY can be designed to interoperate with:

- Skill India Digital Hub
- National Career Service
- Training Provider Systems
- Employer Systems
- SMS / WhatsApp / IVR channels
- Labour-market and skills datasets

> The goal is to complement the existing ecosystem rather than replace it.

---

# 🏆 Core USP

> **"Don't just measure who was trained. Measure what happened after training — and use those outcomes to improve the next cohort."**

### Track → Verify → Measure → Understand → Improve

---

# 👥 Team

### Team Name
**YOUR TEAM NAME**

### Members

- Member 1 — Role
- Member 2 — Role
- Member 3 — Role
- Member 4 — Role

---

# 📜 License

This project is developed as a hackathon prototype for Smart India Hackathon 2026.

Add your preferred open-source license before public production use.

---

# ⭐ If you like the idea

Give the repository a ⭐ and follow the project for future development.
