import re

def calculate_ats_score(text: str, job_description: str = None):
    """
    Advanced ATS Analyzer ensuring clean placeholder sanitization for front-end dashboards.
    """
    text_lower = text.lower()
    
    # 1. Section Presence Score (Max 30)
    section_score = 0
    sections = {
        "education": ["education", "academic", "qualification", "degree"],
        "skills": ["skills", "technical expertise", "core competencies", "technologies"],
        "projects": ["project", "personal work", "open source"],
        "experience": ["experience", "employment", "work history", "internship"],
        "contact": ["email", "phone", "contact", "address", "mobile"],
        "links": ["linkedin", "github", "portfolio"]
    }
    
    for section, keywords in sections.items():
        if any(kw in text_lower for kw in keywords):
            section_score += 5

    # 2. Formatting & Optimization Checks (Max 30)
    formatting_score = 30
    if len(re.findall(r'\n{3,}', text)) > 0:
        formatting_score -= 10
    if len(re.findall(r'[\u2022\u25CF\u25CB\u25A0]', text)) > 15:
        formatting_score -= 5
        
    has_metrics = len(re.findall(r'\b\d+(?:%|\s*percent|\s*plus|\s*\+)\b|\$\d+', text_lower)) > 0
    if not has_metrics:
        formatting_score -= 10

    # 3. Dynamic Keyword Matching against Job Description (Max 40)
    keyword_score = 25  
    matched_keywords = []
    missing_keywords = []
    
    if job_description and job_description.strip() != "" and job_description.lower() != "string":
        jd_words = set(re.findall(r'\b[a-zA-Z]{3,15}\b', job_description.lower()))
        stopwords = {'with', 'the', 'and', 'for', 'that', 'from', 'this', 'using', 'team', 'work', 'role', 'must', 'have', 'required'}
        important_jd_keywords = jd_words - stopwords
        
        resume_words = set(re.findall(r'\b[a-zA-Z]{3,15}\b', text_lower))
        
        matches = important_jd_keywords.intersection(resume_words)
        matched_keywords = list(matches)[:10]
        
        missing = important_jd_keywords - resume_words
        missing_keywords = list(missing)[:10]
        
        # CRITICAL HACKATHON FILTER: Clean out literal "string" values from query placeholders
        missing_keywords = [kw for kw in missing_keywords if kw.lower() != "string" and len(kw) > 1]
        matched_keywords = [kw for kw in matched_keywords if kw.lower() != "string" and len(kw) > 1]
        
        if important_jd_keywords:
            match_ratio = len(matches) / len(important_jd_keywords)
            keyword_score = min(int(match_ratio * 40), 40)
        else:
            keyword_score = 40

    total_score = section_score + formatting_score + keyword_score

    return {
        "overall_score": min(max(total_score, 0), 100),
        "breakdown": {
            "section_presence": section_score,
            "formatting_quality": formatting_score,
            "keyword_match": keyword_score
        },
        "insights": {
            "quantifiable_metrics_found": has_metrics,
            "matched_jd_keywords": matched_keywords,
            "missing_jd_keywords": missing_keywords
        }
    }