from django.urls import path
from . import views

app_name = 'search' 

urlpatterns = [
    path('search-topic/', views.search_view, name='search'),
]
