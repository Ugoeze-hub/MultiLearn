from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Enrollment)
admin.site.register(Course)
admin.site.register(Question)
admin.site.register(Option)