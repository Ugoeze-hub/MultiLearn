import os
import requests
from googleapiclient.discovery import build
from bs4 import BeautifulSoup
from django.conf import settings
from dotenv import load_dotenv
load_dotenv()


def fetch_youtube_courses(query, max_results=10, page_token=None):
    youtube = build('youtube', 'v3', developerKey=settings.YOUTUBE_API_KEY)
    search_resp = youtube.search().list(
        q=query,
        part='snippet', #this is to get the title, description fom the videos
        type='video', 
        maxResults=max_results,
        pageToken=page_token
    ).execute()
    
    results = []
    for item in search_resp.get('items', []):
        vid = item['id']['videoId']
        snip = item['snippet']

        results.append({
            'title': snip['title'],
            'description': snip['description'],
            'url': f'https://www.youtube.com/watch?v={vid}',
            'source': 'Youtube',
            'video_id': vid,
            'thumbnail': snip['thumbnails']['medium']['url'],
            'is_paid': False
        })
    print("YOUTUBE API KEY:", settings.YOUTUBE_API_KEY)
    print("Search Response:", search_resp)
    next_page_token = search_resp.get('nextPageToken')
    return results, next_page_token


def fetch_udemy_courses(query):
    url = f"https://www.udemy.com/api-2.0/courses/?search={query}&page_size=5"
    headers = { #this is to define a http to mimic an actual browser to prevemt blocks
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    response = requests.get(url, headers=headers)

    results = []
    if response.status_code == 200:
        data = response.json()
        for course in data.get('results', []):
            results.append({
                'title': course.get('title'),
                'description': course.get('headline'),
                'url': f"https://www.udemy.com{course.get('url')}",
                'source': 'Udemy',
                'thumbnail': course.get('image_240x135'),
                'is_paid': not course.get('is_free')
            })
    print("Udemy Status:", response.status_code)
    print("Udemy Response:", response.text[:500])
    return results


def fetch_cousera_courses(query):
    search_url = f"https://www.coursera.org/search?query={query}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    response = requests.get(search_url, headers=headers)

    results = []
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for card in soup.select('div.card'):
            title_tag = card.select_one('h2')
            descrip_tag = card.select_one('p')
            link_tag = card.select_one('a[href*="/learn/"]')
            image_tag = card.select_one('img')

            if title_tag and link_tag:
                results.append({
                    'title': title_tag.text.strip(),
                    'description': descrip_tag.text.strip() if descrip_tag else "",
                    'url': f"https://www.coursera.org{link_tag['href']}",
                    'source': 'Coursera',
                    'thumbnail': image_tag['src'] if image_tag else "",
                    'is_paid': 'professional-certificate' in link_tag['href'] or 'specialization' in link_tag['href']
                })
    print("Coursera status:", response.status_code)
    print("Coursera page sample:", response.text[:500])
    return results
            

def fetch_courses(query, page=1, page_token=None):
    youtube_results, next_page_token = fetch_youtube_courses(query, max_results=10, page_token=page_token)
    coursera_results = fetch_cousera_courses(query)
    
    results = []
    max_length = max(len(youtube_results), len(coursera_results))
    for i in range(max_length):
        if i < len(youtube_results):
            results.append(youtube_results[i])
        if i < len(coursera_results):
            results.append(coursera_results[i])
    
    return results, next_page_token, page