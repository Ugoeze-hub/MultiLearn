from django.shortcuts import render, redirect
from .forms import SignUpForm, LoginForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required 
from .models import Enrollment

def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)

        if form.is_valid():
            user = form.save()
            login(request, user) #this makes the user login automatically after signup
            return redirect('dashboard')
        
    else:
        form = SignUpForm()

    return render(request, 'accounts/signup.html', {'form': form})
    

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('dashboard')
        
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form':form})
        

@login_required
def my_courses_view(request):
    enrollments = Enrollment.objects.filter(user=request.user).select_related('course')
    return render(request, 'accounts/my_courses.html', {'enrollments':enrollments})


@login_required
def dashboard_view(request):
    enrolled_count = Enrollment.objects.filter(user=request.user).count()
    return render(request, "accounts/dashboard.html", {
        "enrolled_count": enrolled_count
    })







@login_required
def logout_view(request):
    logout(request)
    return redirect('login')