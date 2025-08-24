import google.generativeai as genai
import json
import logging
import os
from dotenv import load_dotenv
from django.db.models import Avg, Count, Q
from .models import *

load_dotenv()
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def generate_quiz(topic, difficulty='easy', num_questions=5, user=None):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')

        performance_context = ""
        if user:
            past_quizzes = Quiz.objects.filter(user=user, topic=topic)
            avg_score = past_quizzes.aggregate(Avg('score'))['score__avg'] or 0
            total_attempts = past_quizzes.count()
            correct_answers = UserAnswer.objects.filter(
                user=user, quiz__topic=topic, option__is_correct=True
            ).count()
            total_answers = UserAnswer.objects.filter(
                user=user, quiz__topic=topic
            ).count()
            accuracy = (correct_answers / total_answers * 100) if total_answers > 0 else 0
            
            # Adjust difficulty based on performance
            if avg_score < 50 or accuracy < 60:
                difficulty = 'easy'
                performance_context = f"User has low performance ({avg_score:.1f}% average score, {accuracy:.1f}% accuracy). Focus on foundational concepts."
            elif avg_score < 80 or accuracy < 80:
                difficulty = 'medium'
                performance_context = f"User has moderate performance ({avg_score:.1f}% average score, {accuracy:.1f}% accuracy). Include intermediate concepts."
            else:
                difficulty = 'hard'
                performance_context = f"User has strong performance ({avg_score:.1f}% average score, {accuracy:.1f}% accuracy). Challenge with advanced questions."


        difficulty_prompt = {
            'easy': "Use simple language and basic concepts",
            'medium': "Include moderate complexity questions",
            'hard': "Create challenging questions with higher-order thinking"
        }.get(difficulty, '')
        
        prompt = (
            f"Generate a {difficulty} difficulty quiz with {num_questions} multiple-choice questions about {topic}. "
            f"{difficulty_prompt}"
            "Format the response as a JSON array where each element is a question object. "
            "Each question object must have: "
            "'question' (string), 'options' (array of 4 strings, labeled A-D), "
            "'answer' (correct option text).\n\n"
            "Example valid response:\n"
            """[
                {
                    "question": "What is the capital of France?",
                    "options": ["Paris", "London", "Berlin", "Madrid"],
                    "answer": "Paris"
                }
            ]\n\n"""
            "Return only the JSON array without any additional text or markdown formatting."
        )
        
        response = model.generate_content(prompt)
        logger.info(f"Gemini API Response: {response.text}")
        response_text = response.text.strip()
        
        # to reemove markdown code block wrappers if present
        if response_text.startswith('```json'):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith('```'):
            response_text = response_text[3:-3].strip()
        
        questions = json.loads(response_text)
        return questions
    
    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing failed: {e}\nResponse text: {response_text}")
        return None
    except Exception as e:
        logger.error(f"Quiz generation error: {str(e)}")
        return None
