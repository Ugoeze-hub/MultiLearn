from django.shortcuts import render
from .utils import fetch_courses
from django.contrib.auth.decorators import login_required

@login_required
def search_view(request):
    query = request.GET.get('q', '')
    results = []
    
    if query:
        
        modified_query = f'{query} tutorial'
        results = fetch_courses(modified_query)

    return render(request, 'search/results.html', {'query': query, 'results': results})