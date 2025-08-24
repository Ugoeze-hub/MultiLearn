from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput, EmailInput

class SignUpForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=EmailInput(attrs={
            'placeholder': 'Enter your email address'              
                })
        )
    
    username = forms.CharField(
        widget=TextInput(attrs={
            'placeholder': 'Enter a name you want to go by'
            })
    )

    password1 = forms.CharField(
        widget=PasswordInput(attrs={
            'placeholder': 'Create a Strong Password'
        })
    )
    
    class Meta:

        model = User
        fields = ('username', 'email', 'password1', 'password2')


class LoginForm(AuthenticationForm):
    username = forms.CharField(
        widget=TextInput(attrs={
            'autofocus': True
        })
    )

    password = forms.CharField(widget=PasswordInput)