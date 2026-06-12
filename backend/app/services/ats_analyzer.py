def calculate_ats_score(text: str):

    score = 0

    sections = {
        "education": 15,
        "skills": 20,
        "project": 20,
        "experience": 20,
        "contact": 15,
        "linkedin": 10
    }

    text = text.lower()

    if "education" in text:
        score += sections["education"]

    if "skill" in text:
        score += sections["skills"]

    if "project" in text:
        score += sections["project"]

    if "experience" in text or "internship" in text:
        score += sections["experience"]

    if "email" in text or "contact" in text:
        score += sections["contact"]

    if "linkedin" in text:
        score += sections["linkedin"]

    return min(score, 100)