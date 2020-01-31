from django.db import models


class Student(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    skills = models.CharField(max_length=50)

    def __str__(self):
        return str(self.firstName)

    def skills_list(self):
        return list(str(self.skills).split(','))
