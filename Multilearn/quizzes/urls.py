from django.urls import path
from . import views

app_name = 'quizzes' 

urlpatterns = [
    path('my-courses/', views.my_courses_view, name='my_courses'),
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path('course/<int:pk>/', views.course_detail_view, name='course_detail'),
    path('enroll-course', views.enroll_course_by_url, name='enroll_course')
]