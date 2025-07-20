from django.urls import path
from . import views

app_name = 'quizzes' 

urlpatterns = [
    path('my-courses/', views.my_courses_view, name='my_courses'),
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path('course/<int:pk>/', views.course_detail_view, name='course_detail'),
    path('enroll-course', views.enroll_course_by_url, name='enroll_course'),
    path('create-quiz/', views.create_quiz_view, name='create_quiz'),
    path('<int:quiz_id>/take-quiz/',   views.take_quiz_view,   name='take_quiz'),
    path('<int:quiz_id>/quiz-result/', views.quiz_result_view, name='quiz_result'),
    path('my-quizzes/', views.my_quizzes_view, name='my_quizzes'),
    path('recommendations/', views.recommend_courses, name='recommendations'),
]