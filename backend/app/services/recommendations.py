def generate_recommendations(missing_skills: list):
    """
    Generates structured, clean learning roadmaps for the Next.js visual timeline.
    Guarantees zero leakage of "string" or bad formatting tags into the frontend.
    """
    recommendations = []
    
    # 1. Clean and normalize incoming array items
    clean_missing = []
    seen = set()
    for skill in missing_skills:
        if not skill:
            continue
        s_norm = str(skill).strip()
        # Filter placeholders out right away
        if s_norm.lower() in ["string", "str", "placeholder", ""]:
            continue
        if s_norm.lower() not in seen:
            seen.add(s_norm.lower())
            clean_missing.append(s_norm)

    # 2. Complete mapping resource dictionary with uniform capitalization
    RESOURCE_BANK = {
        "Python": {"source": "Coursera - Python for Everybody", "eta": "2 weeks", "type": "Course"},
        "Java": {"source": "Udemy - Java Programming Masterclass", "eta": "3 weeks", "type": "Course"},
        "Javascript": {"source": "MDN Web Docs & JavaScript Info", "eta": "2 weeks", "type": "Documentation"},
        "React": {"source": "Scrimba - Learn React for Free", "eta": "3 weeks", "type": "Interactive Project"},
        "Node.js": {"source": "Udemy - Complete Node.js Developer", "eta": "3 weeks", "type": "Course"},
        "Next.js": {"source": "Next.js Official Learn Dashboard", "eta": "1 week", "type": "Documentation"},
        "Git": {"source": "Official Git Documentation & GitHub Guides", "eta": "1 week", "type": "Practice Tutorial"},
        "Html": {"source": "freeCodeCamp - Responsive Web Design", "eta": "1 week", "type": "Course"},
        "Css": {"source": "Kevin Powell - CSS Demystified", "eta": "2 weeks", "type": "Video Guide"},
        "Sql": {"source": "Khan Academy - Intro to SQL", "eta": "1 week", "type": "Practice Track"},
        "Docker": {"source": "TechWorld with Nana - Docker Tutorial", "eta": "1 week", "type": "Video Series"},
        "Aws": {"source": "AWS Certified Cloud Practitioner Essentials", "eta": "2 weeks", "type": "Certification"},
        "Kubernetes": {"source": "KodeKloud - Kubernetes for Beginners", "eta": "3 weeks", "type": "Hands-On Lab"},
        "Typescript": {"source": "Total TypeScript by Matt Pocock", "eta": "1 week", "type": "Interactive Mastery"},
        "Mongodb": {"source": "MongoDB University - Developer Basics", "eta": "1 week", "type": "Course"},
        "Postgresql": {"source": "PostgreSQL Tutorial Core Guide", "eta": "2 weeks", "type": "Documentation"},
        "Ci/cd": {"source": "GitHub Actions Official Labs", "eta": "1 week", "type": "Hands-On Lab"},
        "Rest api": {"source": "Postman University - API Design Foundations", "eta": "1 week", "type": "Interactive Course"}
    }
    
    # Fallback to build a balanced roadmap if everything turns out clean but empty
    if not clean_missing:
        clean_missing = ["Java", "React", "SQL", "Git", "Docker"]
    
    # 3. Assemble clear step milestones (capped at 5 for clean UI timeline view layouts)
    for index, skill in enumerate(clean_missing[:5]):
        # Match against resource keys using variations of title case and lowercase
        lookup_key = skill.strip().lower()
        
        # Map structural spelling edge-cases directly to dictionary entries
        matched_meta = None
        for key in RESOURCE_BANK.keys():
            if key.lower() == lookup_key:
                matched_meta = RESOURCE_BANK[key]
                skill = key # Standardize text syntax (e.g. Node.js instead of Node.Js)
                break
                
        if matched_meta:
            recommendations.append({
                "step": index + 1,
                "skill": skill,
                "action": f"Master {skill} syntax, engineering patterns, and core integration pipelines.",
                "recommended_resource": matched_meta["source"],
                "duration": matched_meta["eta"],
                "format": matched_meta["type"]
            })
        else:
            recommendations.append({
                "step": index + 1,
                "skill": skill.title(),
                "action": f"Deep dive into {skill.title()} software architectural paradigms.",
                "recommended_resource": f"Official {skill.title()} Reference Manuals & Community Boilerplates",
                "duration": "2 weeks",
                "format": "Self-Directed Study"
            })
            
    return recommendations