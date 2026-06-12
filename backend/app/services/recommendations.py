def generate_recommendations(missing_skills):

    recommendations = []

    skill_map = {
        "sql": "Learn SQL for data querying and database operations.",
        "excel": "Develop advanced Excel skills including pivot tables and lookups.",
        "power bi": "Build dashboard projects using Power BI.",
        "tableau": "Learn Tableau for business intelligence and visualization.",
        "statistics": "Strengthen statistics and probability concepts."
    }

    for skill in missing_skills:
        if skill.lower() in skill_map:
            recommendations.append(skill_map[skill.lower()])

    return recommendations