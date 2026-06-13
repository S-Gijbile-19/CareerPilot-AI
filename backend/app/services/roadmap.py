def generate_roadmap(missing_skills):

    roadmap = {
        "Week 1": [],
        "Week 2": [],
        "Week 3": [],
        "Week 4": []
    }

    for skill in missing_skills:

        skill = skill.lower()

        if skill in ["sql", "database"]:
            roadmap["Week 1"].append("Learn SQL fundamentals + practice queries")

        elif skill in ["excel"]:
            roadmap["Week 2"].append("Excel basics + pivot tables + reporting")

        elif skill in ["power bi", "tableau"]:
            roadmap["Week 3"].append(f"Learn {skill} + build dashboard project")

        elif skill in ["statistics", "machine learning"]:
            roadmap["Week 2"].append("Strengthen statistics + ML basics")

        else:
            roadmap["Week 4"].append(f"Revise {skill} + apply in mini project")

    return roadmap