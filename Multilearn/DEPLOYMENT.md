# MultiLearn Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: Set up a PostgreSQL database (recommended: Neon, Supabase, or Railway)
3. **YouTube API Key**: Get from [Google Cloud Console](https://console.cloud.google.com/)

## Environment Variables Setup

In your Vercel project settings, add these environment variables:

### Required Variables:
```
DATABASE_URL=postgresql://username:password@host:port/database_name
SECRET_KEY=your_secure_secret_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### Optional Variables:
```
DEBUG=False
```

## Deployment Steps

### 1. Prepare Your Repository
- Make sure all files are committed to your Git repository
- Ensure your repository is connected to Vercel

### 2. Database Setup
1. Create a PostgreSQL database
2. Copy the connection string
3. Add it as `DATABASE_URL` in Vercel environment variables

### 3. YouTube API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the API key as `YOUTUBE_API_KEY` in Vercel

### 4. Deploy to Vercel
1. Push your code to GitHub/GitLab
2. Vercel will automatically detect the Django project
3. Configure build settings if needed
4. Deploy!

## Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check if `DATABASE_URL` is correctly set
   - Ensure database is accessible from Vercel

2. **Static Files Not Loading**
   - Check if `STATIC_ROOT` is properly configured
   - Ensure `collectstatic` runs during build

3. **YouTube API Not Working**
   - Verify `YOUTUBE_API_KEY` is set
   - Check if API key has proper permissions

4. **Build Failures**
   - Check Vercel build logs
   - Ensure all dependencies are in `requirements.txt`

### Debug Mode
To enable debug mode temporarily:
```
DEBUG=True
```

## File Structure
```
MultiLearn/
├── Multilearn/
│   ├── Multilearn/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── accounts/
│   ├── quizzes/
│   ├── search/
│   ├── static/
│   ├── templates/
│   ├── requirements.txt
│   ├── vercel.json
│   └── build_files.sh
```

## Support
If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with same environment variables 