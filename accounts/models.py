from django.db import models
# from django.contrib.auth.models import User

# class Course(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True)
#     source = models.CharField(max_length=100)  # e.g. Udemy, Coursera
#     url = models.URLField()

#     def __str__(self):
#         return self.title
    
# class Enrollment(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_users')
#     added_on = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ('user', 'course')
