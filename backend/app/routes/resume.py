from fastapi import APIRouter, UploadFile, File
from app.services.resume_parser import extract_text_from_pdf
from app.services.ats_analyzer import calculate_ats_score
from app.services.skill_gap import analyze_skill_gap
router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file.file)

    ats_score = calculate_ats_score(text)

    return {
        "success": True,
        "text": text,
        "ats_score": ats_score
    }
    
    skill_gap = analyze_skill_gap(
    text,
    "Data Analyst"
)
    return {
        "found_skills": skill_gap["found"],
        "missing_skills": skill_gap["missing"]
    }
