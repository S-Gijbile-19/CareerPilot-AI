import httpx
from datetime import datetime

async def fetch_live_job_deadlines():
    """
    Simulates a real-world integration with a Job API.
    In a real scenario, replace the mock list with an authenticated API call
    to a service like LinkedIn Jobs API or a web scraper.
    """
    # Real-world logic: Fetch from a central job database or official portal
    # async with httpx.AsyncClient() as client:
    #     response = await client.get("https://api.yourjobboard.com/deadlines")
    #     live_data = response.json()
    
    # Mocking real data returned from an API
    live_data = [
        {"company": "TCS", "reg_due": "2026-06-20", "exam_date": "2026-07-05"},
        {"company": "Capgemini", "reg_due": "2026-06-25", "exam_date": "2026-07-10"}
    ]
    
    today = datetime.now().date()
    alerts = []
    
    for job in live_data:
        due_date = datetime.strptime(job["reg_due"], "%Y-%m-%d").date()
        days_until = (due_date - today).days
        
        # Only return real, urgent alerts
        if 0 <= days_until <= 7:
            alerts.append({
                "company": job["company"],
                "days_remaining": days_until,
                "exam_date": job["exam_date"]
            })
    return alerts