from rest_framework import serializers
from .models import *


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('pk','firstName', 'lastName', 'skills', 'skills_list')
