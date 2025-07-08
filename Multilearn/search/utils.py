import os
import requests
from googleapiclient.discovery import build
from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv()

def fetch_youtube_courses(query, max_results=5):
    youtube = build('youtube', 'v3', developerKey=os.get_env('YOUTUBE_API_KEY'))
    search_resp = youtube.search().list(
        q=query,
        part='snippet', #this is to get the title, description fom the videos
        type='video', 
        maxResults=max_results
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
            'thumbnail': snip['thumbnails']['medium']['urls'],
            'is_paid': False
        })

        return results

    

