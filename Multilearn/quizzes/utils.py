import google.generativeai as genai
import json
import logging
import os
from dotenv import load_dotenv
load_dotenv()
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def generate_quiz(topic, difficulty='easy', num_questions=5):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')

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
            "'answer' (correct option letter, e.g., 'A').\n\n"
            "Example valid response:\n"
            """[
                {
                    "question": "What is the capital of France?",
                    "options": ["Paris", "London", "Berlin", "Madrid"],
                    "correct": "A"
                }
            ]\n\n"""
            "Return only the JSON array without any additional text or markdown formatting."
        )
        
        response = model.generate_content(prompt)
        print (f"Gemini API Response: {response.text}")
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
