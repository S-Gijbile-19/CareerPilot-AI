from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.resume_parser import extract_text_from_pdf
from app.services.ats_analyzer import calculate_ats_score
from app.services.skill_gap import analyze_skill_gap
from app.services.recommendations import generate_recommendations
from typing import Optional, List
import logging

# Set up logging to showcase the "Agentic Decision Making" in your terminal during demo
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CareerPilotAgent")

router = APIRouter()

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_title: Optional[str] = Form("Software Engineer"),
    job_description: Optional[str] = Form(None)
):
    try:
        logger.info(f"Agent initiated: Analyzing resume for {job_title}")
        
        # 1. Autonomous Extraction
        text = extract_text_from_pdf(file.file)
        
        # 2. Agentic Perception: Analyzing the "State" of the resume
        ats_analysis = calculate_ats_score(text, job_description)
        
        # 3. Autonomous Decisioning: Identify gaps
        skill_analysis = analyze_skill_gap(text, job_title)
        
        # 4. Agentic Refinement: Merging JD context with core profile gaps
        missing_skills = list(set(skill_analysis.get("missing", [])))
        
        # Filter out potential placeholder contaminants
        missing_skills = [s for s in missing_skills if s.lower() not in ["string", ""]]
        
        # 5. Execution: Generate prioritized roadmap
        recommendations = generate_recommendations(missing_skills)

        logger.info("Agentic workflow successful: Payload generated.")

        return {
            "success": True,
            "agent_status": "optimized",
            "target_job": job_title,
            "text_preview": text[:300] + "...",
            "ats_metrics": ats_analysis,
            "found_skills": skill_analysis.get("found", []),
            "missing_skills": missing_skills,
            "recommendations": recommendations
        }

    except Exception as e:
        logger.error(f"Agentic failure: {str(e)}")
        raise HTTPException(status_code=500, detail="Agent failed to process resume.")

@router.post("/agent-refine")
async def refine_skills(missing_skills: List[str]):
    """
    Autonomous endpoint: Pass missing skills to get a refined action plan.
    """
    logger.info("Agentic refinement triggered.")
    return {
        "success": True,
        "new_recommendations": generate_recommendations(missing_skills)
    }