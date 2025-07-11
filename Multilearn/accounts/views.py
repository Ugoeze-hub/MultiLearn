from django.shortcuts import render, redirect
from .forms import SignUpForm, LoginForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required 

def landing_page(request):
    return render(request, 'accounts/index_2.html')

def aboutUs_view(request):
    return render(request, 'accounts/aboutUs.html')

def team_view(request):
    return render(request, 'accounts/team.html')


def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)

        if form.is_valid():
            user = form.save()
            login(request, user) #this makes the user login automatically after signup
            return redirect('quizzes/dashboard')
        
    else:
        form = SignUpForm()

    return render(request, 'accounts/signup.html', {'form': form})
    

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('/dashboard')
        
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form':form})
        









@login_required
def logout_view(request):
    logout(request)
    return redirect('login')