from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.utils import timezone
from .models import *
import logging
from .forms import *
from .utils import *

logger = logging.getLogger(__name__)

@login_required
def enroll_course_by_url(request):
    if request.method == 'POST':

        expected_fields = ['title', 'description', 'source', 'url', 'thumbnail', 'video_id', 'is_paid']
        course_data = {field: request.POST.get(field, '') for field in expected_fields}

        course_data['is_paid'] = course_data['is_paid'] == 'True'

        course, _ = Course.objects.get_or_create(
            url=course_data['url'],
            defaults=course_data
        )

        Enrollment.objects.get_or_create(user=request.user, course=course)

        return redirect('quizzes:my_courses')
    return redirect('search')


# @login_required
# def my_courses_view(request):
#     enrollments = request.user.enrollments.select_related('course')
#     return render(request, 'quizzes/my_courses.html', {'enrollments': enrollments})

@login_required
def my_courses_view(request):
    enrollments = Enrollment.objects.filter(user=request.user).select_related('course')
    return render(request, 'quizzes/my_courses.html', {'enrollments':enrollments})


@login_required
def dashboard_view(request):
    enrolled_count = Enrollment.objects.filter(user=request.user).count()
    return render(request, "quizzes/dashboard.html", {
        "enrolled_count": enrolled_count
    })

@login_required
def course_detail_view(request, course_id):
    course_obj = get_object_or_404(Course, id=course_id)
    course = model_to_dict(course_obj)
    return render(request, 'quizzes/course_detail.html', {'course': course})


@login_required
def mark_complete(request, enrollment_id):
    e = get_object_or_404(Enrollment, id=enrollment_id, user=request.user)
    e.completed = True
    e.completion_date = timezone.now()
    e.save()
    return redirect('quizzes:my_courses')


@login_required
def create_quiz_view(request):
    if request.method == 'POST':
        topic = request.POST.get('topic')
        difficulty = request.POST.get('difficulty', 'easy')
        num_questions = request.POST.get('num_questions')

        questions_data = generate_quiz(topic, difficulty, num_questions)

        if questions_data:
            quiz = Quiz.objects.create(
                user=request.user,
                topic=topic,
                difficulty=difficulty,
                total_questions=num_questions,
            )

            for q in questions_data:
                question = Question.objects.create(
                    quiz = quiz,
                    text = q['question']
                )

                for label, option_text in zip(['A', 'B', 'C', 'D'], q['options']):
                    Option.objects.create(
                        question=question,
                        label=label,
                        text=option_text,
                        is_correct=(option_text == q['answer'])
                    )

            return redirect('quizzes:take_quiz', quiz_id=quiz.id)
        
        return render(request, 'quizzes/error.html', {
            'message': 'Failed to generate quiz. Please try again.'
        })

    return render(request, 'quizzes/create_quiz.html')



@login_required
def take_quiz_view(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id, user=request.user)
    questions = quiz.questions.all()

    if request.method == 'POST':
        form = QuizForm(request.POST, questions=questions)
        if form.is_valid():
            score = 0

            UserAnswer.objects.filter(quiz=quiz, user=request.user).delete()

            for i, question in enumerate(questions):
                user_answer = form.cleaned_data[f'question_{i}']
                # simple check: did they pick the same letter as correct_answer?
                try:

                    selected_opt = question.options.get(label=user_answer)

                    UserAnswer.objects.create(
                        user=request.user,
                            quiz=quiz,
                            question=question,
                            option=selected_opt
                    )

                    if selected_opt.is_correct:
                        score += 1

                except Option.DoesNotExist:
                    continue

            quiz.score = score
            quiz.save()
            return redirect('quizzes:quiz_result', quiz_id=quiz.id)
        
        else:
            form = QuizForm(questions=questions)

        return render(request, 'quizzes/take_quiz.html', {
        'quiz': quiz,
        'form': form
    })
        

@login_required
def quiz_result_view(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id, user=request.user)
    return render(request, 'quizzes/result.html', {'quiz': quiz})