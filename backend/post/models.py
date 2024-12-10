from django.db import models

class Post(models.Model):
    MEDIA_TYPES = [
        ('vidoe','vidoe'),
        ('image','image'),
    ]

    title = models.TextField(null=True, blank=True)
    media = models.FileField(upload_to='posts/')
    description = models.TextField()
    created_at = models.DateTimeField()
    media_type = models.CharField(max_length=300, choices=MEDIA_TYPES)

    def __str__(self):
        return self.title