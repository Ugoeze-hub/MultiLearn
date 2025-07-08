from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.signup_view, name='signup'),
    path("login/", views.login_view, name='login'),
    path('my-courses/', views.my_courses_view, name='my_courses'),
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path("logout/", views.logout_view, name='logout'),
]