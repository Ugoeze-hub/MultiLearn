from django.shortcuts import render
from .utils import fetch_courses
from django.contrib.auth.decorators import login_required
from .models import *
from collections import Counter

TAG_RECOMMENDATION_MAP = {
    'python': ['django', 'flask', 'machine learning'],
    'html': ['css', 'javascript', 'web design'],
    'css': ['tailwind', 'bootstrap', 'responsive design'],
    'javascript': ['react', 'vue', 'node.js'],
    'django': ['python', 'rest api', 'postgresql'],
    'data science': ['python', 'pandas', 'machine learning'],
    'ai': ['machine learning', 'python', 'deep learning'],
}


@login_required
def search_view(request):
    query = request.GET.get('q', '')
    page = int(request.GET.get('page', 1))
    results = []
    tags = []
    recommended_courses = []
    next_page_token=None
    
    if query:
        
        SearchHistory.objects.create(user=request.user, query=query)

        modified_query = f'{query} tutorial'
        results, next_page_token = fetch_courses(modified_query, page)

        tags = TAG_RECOMMENDATION_MAP.get(query.lower(), [])

        results = [course for course in results if course.get('title') and course.get('url')]

 

    return render(request, 'search/results.html', {
        'query': query,
        'results': results,
        'tags': tags,
        'recommendations': recommended_courses,
        'page': page,
        'next_page_token': next_page_token
        })