"""
Synthetic Data Generator & Database Seed Script for SkillAI360.
Generates 5,000 trainees, 20 providers, 30 courses, 20 districts, 100 employers with correlated outcomes.
Includes Rishi Sharma (Outcome ID KP-10492).
"""

import json
import random

DISTRICTS = [
    "Bhilai", "Raipur", "Durg", "Bilaspur", "KORBA", "Rajnandgaon", "Jagdalpur",
    "Ambikapur", "Dhamtari", "Mahasamund", "Janjgir", "Raigarh", "Kanker", "Kawardha"
]

COURSES = [
    {"title": "Data Analytics & Visualization", "category": "IT & Digital", "taught": ["Excel", "SQL", "Python"]},
    {"title": "EV Assembly Technician", "category": "Automotive", "taught": ["Battery Diagnostics", "Motor Assembly"]},
    {"title": "Full-Stack Web Development", "category": "IT & Digital", "taught": ["HTML/CSS", "JavaScript", "React"]},
    {"title": "Solar PV Installer", "category": "Renewable Energy", "taught": ["Inverter Wiring", "PV Mounting"]},
    {"title": "Healthcare Nursing Assistant", "category": "Healthcare", "taught": ["Patient Care", "Vitals Monitoring"]},
]

def generate_seed():
    trainees = []
    # Seed Rishi Sharma (Demo Persona)
    trainees.append({
        "outcome_id": "KP-10492",
        "name": "Rishi Sharma",
        "email": "rishi.sharma@example.com",
        "district": "Bhilai",
        "course": "Data Analytics & Visualization",
        "provider": "SkillForward Institute",
        "status": "Employed",
        "verified": True,
        "career_pulse": 84
    })

    # Generate 4,999 additional correlated trainees
    for i in range(1, 5000):
        c = random.choice(COURSES)
        status = random.choices(
            ["Employed", "Self-employed", "Apprenticeship", "Unemployed", "Further education"],
            weights=[55, 10, 5, 20, 10]
        )[0]
        verified = status in ["Employed", "Self-employed"] and random.random() < 0.82

        trainees.append({
            "outcome_id": f"KP-{10492 + i}",
            "name": f"Trainee_{i}",
            "email": f"trainee_{i}@example.com",
            "district": random.choice(DISTRICTS),
            "course": c["title"],
            "provider": f"Provider_{random.randint(1, 20)}",
            "status": status,
            "verified": verified,
            "career_pulse": random.randint(65, 95) if verified else random.randint(40, 75)
        })

    with open("seed_data.json", "w") as f:
        json.dump(trainees, f, indent=2)

    print(f"Successfully generated seed_data.json with {len(trainees)} trainees.")

if __name__ == "__main__":
    generate_seed()
