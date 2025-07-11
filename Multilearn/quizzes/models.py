from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)


class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    source = models.CharField(max_length=100)
    url = models.URLField(unique=True)
    thumbnail = models.URLField(blank=True)
    video_id = models.CharField(max_length=50, blank=True, null=True)
    is_paid = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag, blank=True)
    course_enrolled_users = models.ManyToManyField(User, through='Enrollment', related_name='enrolled_courses')

    def __str__(self):
        return f'{self.title} ({self.source})'
    

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_users')
    added_on = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    completion_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'course')


class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=50)
    score = models.IntegerField(default=0)
    total_questions = models.IntegerField()
    taken_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.topic} ({self.created_at.date()})"
    

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()

    def __str__(self):
        return self.text
    
class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    label          = models.CharField(max_length=1, choices=[('A','A'),('B','B'),('C','C'),('D','D')])
    text           = models.CharField(max_length=255)
    is_correct     = models.BooleanField(default=False)

    def __str__(self):
        return self.text
    

class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz     = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option   = models.ForeignKey(Option, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('quiz','question')  # one answer per question per quiz

    def __str__(self):
        return f"{self.quiz.id} Q{self.question.id} → {self.option.label}"