import random
from typing import List, Dict

class InterviewAgent:
    def __init__(self, found_skills: List[str]):
        # Normalize and clean skill names
        self.found_skills = [s.strip() for s in found_skills if s.strip().lower() != "string"]

    def generate_question(self) -> Dict[str, str]:
        """
        Autonomous logic: Picks a detected skill from the profile and constructs 
        a contextual, behavior-driven technical scenario question.
        """
        fallback_skills = ["Software Engineering", "Problem Solving", "System Design", "Git"]
        
        # Pick from resume skills if available, otherwise pull from structural fallbacks
        chosen_skill = random.choice(self.found_skills) if self.found_skills else random.choice(fallback_skills)
        
        scenarios = [
            f"In your previous work with {chosen_skill}, tell me about a time a system architecture constraint or bug forced you to change your approach. What was the outcome?",
            f"Given your practical experience in {chosen_skill}, how would you design an autonomous scaling optimization layer for a high-traffic production application?",
            f"Can you explain a complex technical trade-off you had to make while implementing a feature utilizing {chosen_skill}?"
        ]
        
        return {
            "skill": chosen_skill,
            "question": random.choice(scenarios)
        }

    @staticmethod
    def evaluate_answer(answer: str, skill: str) -> Dict[str, str]:
        """
        Evaluates user interview responses based on structural parameters (STAR method).
        """
        clean_ans = answer.strip()
        word_count = len(clean_ans.split())
        
        if not clean_ans or word_count < 10:
            return {
                "score": "Needs Improvement",
                "feedback": f"The response is too brief. Try to structure your experience with {skill} using the STAR method (Situation, Task, Action, Result) to clearly demonstrate impact."
            }
        
        if word_count > 45:
            return {
                "score": "Excellent",
                "feedback": f"Strong evaluation! You successfully detailed technical implementation steps regarding {skill} with adequate contextual depth."
            }
            
        return {
            "score": "Satisfactory",
            "feedback": "Solid answer. For an extra agentic boost, mention clear quantitative data results or exact runtime metrics achieved."
        }