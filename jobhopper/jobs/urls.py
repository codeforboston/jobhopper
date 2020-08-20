from django.urls import path
from . import views

urlpatterns =[
    path('', views.index, name='index'),
    path('<int:soccode>/',views.description, name='description'),
    path('<str:detail>',views.detail, name = 'detail'),

]