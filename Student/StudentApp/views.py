from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *


class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


@api_view(['GET', ])
def api_student_details_view(request):
    name = Student.objects.all()
    if request.method == 'GET':
        serializer = StudentSerializer(name, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def api_student_details_update(request):
    if request.method == 'GET':
        user = Student.objects.all()
        serializer = StudentSerializer(user, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Studentdelete(DestroyAPIView):
    queryset = Student.objects.all()
    lookup_field ='pk'
    serializer_class = StudentSerializer
