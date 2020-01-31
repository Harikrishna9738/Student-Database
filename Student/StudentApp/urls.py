from django.urls import path
from . import views
from .views import *

from rest_framework import routers

router = routers.DefaultRouter()
router.register('Student', views.StudentView)

urlpatterns = [

    path('user/', api_student_details_view, name='user_update'),
    path('userupdate/', api_student_details_update, name='user_update'),
    path('userdelete/<int:pk>/',Studentdelete.as_view(),name='student_delete')
    ]