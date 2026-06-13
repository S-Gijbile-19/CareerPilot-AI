import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.routes.resume import router as resume_router

app = FastAPI(title="CareerPilot-AI Engine", version="1.1 Ready")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    resume_router,
    prefix="/api/resume",
    tags=["Resume"]
)

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "CareerPilot Production Engine Stabilized"
    }
    

