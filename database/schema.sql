-- KAUSHALPULSE DATABASE SCHEMA
-- SIH 2026 Problem Statement 26135
-- Post-Training Outcome Tracking & Intelligence Platform

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('trainee', 'provider', 'government', 'employer')),
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    rating NUMERIC(3,2) DEFAULT 4.5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration_weeks INT NOT NULL,
    skills_taught TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trainees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    outcome_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. KP-10492
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE RESTRICT,
    provider_id UUID REFERENCES providers(id) ON DELETE RESTRICT,
    enrollment_date DATE NOT NULL,
    certification_date DATE NOT NULL,
    career_pulse_score INT DEFAULT 84 CHECK (career_pulse_score BETWEEN 0 AND 100),
    pulse_status VARCHAR(50) DEFAULT 'Healthy',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS employment_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Employed', 'Self-employed', 'Apprenticeship', 'Unemployed', 'Further education')),
    company_name VARCHAR(255),
    role_title VARCHAR(255),
    joining_date DATE,
    employment_type VARCHAR(50) DEFAULT 'Full-time',
    salary_band VARCHAR(50) CHECK (salary_band IN ('<10K', '10K-20K', '20K-30K', '30K+')),
    is_relevant BOOLEAN DEFAULT TRUE,
    non_placement_reason VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verification_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE,
    employer_id UUID REFERENCES employers(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Verified', 'Rejected', 'Correction Requested')),
    confidence_score INT DEFAULT 40 CHECK (confidence_score BETWEEN 0 AND 100),
    verified_at TIMESTAMP WITH TIME ZONE,
    remarks TEXT
);

CREATE TABLE IF NOT EXISTS followups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE,
    milestone_days INT NOT NULL CHECK (milestone_days IN (30, 90, 180, 365)),
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Overdue')),
    response_summary TEXT,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS cohort_interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    intervention_description TEXT NOT NULL,
    before_placement_rate NUMERIC(5,2) NOT NULL,
    after_placement_rate NUMERIC(5,2) NOT NULL,
    before_retention_6m NUMERIC(5,2) NOT NULL,
    after_retention_6m NUMERIC(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
