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