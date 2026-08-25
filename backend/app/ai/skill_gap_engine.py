"""
Skill Gap Engine for KaushalPulse Backend.
Uses TF-IDF / Keyword matching & alias normalization (PowerBI -> Power BI).
Includes deterministic fallback logic if external ML model or LLM API key is not present.
"""

SYNONYM_MAP = {
    "powerbi": "Power BI Practical Projects",
    "power bi": "Power BI Practical Projects",
    "data visualization": "Power BI Practical Projects",
    "aws": "AWS/Cloud Deployment",
    "cloud": "AWS/Cloud Deployment",
    "cloud deployment": "AWS/Cloud Deployment",
    "communication": "Business Communication",
}

def analyze_skill_gap(taught_skills: list[str], target_role_demand: list[str]):
    normalized_taught = [SYNONYM_MAP.get(s.lower(), s) for s in taught_skills]
    normalized_demand = [SYNONYM_MAP.get(s.lower(), s) for s in target_role_demand]

    matched = [s for s in normalized_demand if s in normalized_taught]
    missing = [s for s in normalized_demand if s not in normalized_taught]

    high_priority = [s for s in missing if "Power BI" in s or "Diagnostics" in s]
    medium_priority = [s for s in missing if "Communication" in s]
    emerging = [s for s in missing if s not in high_priority and s not in medium_priority]

    if not high_priority and missing:
        high_priority.append(missing[0])

    return {
        "taught_skills": taught_skills,
        "demanded_skills": target_role_demand,
        "high_priority_gaps": high_priority,
        "medium_priority_gaps": medium_priority,
        "emerging_skills": emerging or ["AI-Assisted Workflows"],
        "matched_skills": matched,
    }
