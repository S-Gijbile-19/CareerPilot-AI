ROLE_SKILLS = {
    "Data Analyst": [
        "python",
        "sql",
        "excel",
        "power bi",
        "tableau",
        "statistics"
    ],
    "Frontend Developer": [
        "html",
        "css",
        "javascript",
        "react",
        "typescript"
    ]
}

def analyze_skill_gap(text, role):
    text = text.lower()

    required = ROLE_SKILLS.get(role, [])

    found = []
    missing = []

    for skill in required:
        if skill.lower() in text:
            found.append(skill)
        else:
            missing.append(skill)

    return {
        "found": found,
        "missing": missing
    }