from fastapi import FastAPI
from app.routes.resume import router as resume_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
        "message": "CareerPilot Backend Running"
    }
    

