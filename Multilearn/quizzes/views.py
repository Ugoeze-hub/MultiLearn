from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.utils import timezone
from .models import *

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
