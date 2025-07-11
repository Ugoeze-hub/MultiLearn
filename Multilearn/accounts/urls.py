from django.urls import path
from . import views

app_name = 'accounts' 

urlpatterns = [
    path("", views.landing_page, name='home'),
    path("signup/", views.signup_view, name='signup'),
    path("login/", views.login_view, name='login'),
    path("logout/", views.logout_view, name='logout'),
    path("aboutUs/", views.aboutUs_view, name='aboutUs'),
]