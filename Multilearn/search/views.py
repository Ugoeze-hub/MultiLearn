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
    results = []
    tags = []
    recommended_courses = []
    
    if query:
        
        SearchHistory.objects.create(user=request.user, query=query)

        modified_query = f'{query} tutorial'
        results = fetch_courses(modified_query)

        tags = TAG_RECOMMENDATION_MAP.get(query.lower(), [])

        results = [course for course in results if course.get('title') and course.get('url')]

    else:
        past_searches = SearchHistory.objects.filter(user=request.user)
        if past_searches.exists():

            recent_query = past_searches.latest('searched_at').query
            recommended_courses = fetch_courses(f'{recent_query} tutorial')

    return render(request, 'search/results.html', {
        'query': query,
        'results': results,
        'tags': tags,
        'recommendations': recommended_courses
        })