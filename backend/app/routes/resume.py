from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.resume_parser import extract_text_from_pdf
from app.services.ats_analyzer import calculate_ats_score
from app.services.skill_gap import analyze_skill_gap
from app.services.recommendations import generate_recommendations
from app.services.interview_bot import InterviewAgent
from typing import Optional, List
import logging
from app.services.job_monitor import fetch_live_job_deadlines

# Set up logging for agent monitoring terminal visibility during demos
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
        logger.info(f"Agent loop initialized: Analyzing resume for target profile: {job_title}")
        
        # 1. Text token extraction
        text = extract_text_from_pdf(file.file)
        
        # 2. Score metrics calculations 
        ats_analysis = calculate_ats_score(text, job_description)
        
        # 3. Dynamic profile gap analysis matching matrix
        skill_analysis = analyze_skill_gap(text, job_title)
        
        # 4. Clean skill list formatting
        missing_skills = list(set(skill_analysis.get("missing", [])))
        missing_skills = [s for s in missing_skills if s.lower() not in ["string", ""]]
        
        # 5. Build roadmap steps curriculum
        recommendations = generate_recommendations(missing_skills)

        logger.info("Agent pipeline execution complete. Dispatching context metadata maps.")

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
        logger.error(f"Core Agent Failure Loop: {str(e)}")
        raise HTTPException(status_code=500, detail="Autonomous orchestrator failed to process target elements.")

@router.post("/interview/ask")
async def get_interview_question(skills: List[str]):
    """
    Agent endpoint: Generates context-rich mock interview questions using profile skill strings.
    """
    try:
        logger.info("Interview Agent: Context query received. Generating targeted questions.")
        agent = InterviewAgent(skills)
        question_payload = agent.generate_question()
        return {
            "success": True,
            "skill": question_payload["skill"],
            "question": question_payload["question"]
        }
    except Exception as e:
        logger.error(f"Interview Agent error on question generation: {str(e)}")
        raise HTTPException(status_code=500, detail="Interviewer module failed to cycle questions.")

@router.post("/interview/evaluate")
async def evaluate_interview_response(answer: str = Form(...), skill: str = Form(...)):
    """
    Agent endpoint: Evaluates structural content and parses real-time text critique feedbacks.
    """
    try:
        logger.info(f"Interview Agent: Assessing response stream metrics for skill: {skill}")
        evaluation = InterviewAgent.evaluate_answer(answer, skill)
        return {
            "success": True,
            "score": evaluation["score"],
            "feedback": evaluation["feedback"]
        }
    except Exception as e:
        logger.error(f"Interview Agent error on evaluation loop: {str(e)}")
        raise HTTPException(status_code=500, detail="Critique calculation thread encountered a boundary exception.")

@router.get("/alerts")
async def get_alerts():
    """
    This route is now live, properly indented, and ready for frontend polling.
    """
    try:
        return await fetch_live_job_deadlines()
    except Exception as e:
        logger.error(f"Alerts background lookup error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch job alert matrices.")