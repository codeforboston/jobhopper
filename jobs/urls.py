from django.urls import path
from . import views
from rest_framework import routers
from .api import LeadViewSet

# urlpatterns =[
#     path('', views.index, name='index'),
#     path('<int:soccode>/',views.description, name='description'),
#     path('<str:detail>',views.detail, name = 'detail'),

# ]

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls