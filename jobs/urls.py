from django.urls import path, include
from . import views
from rest_framework import routers
from .api import LeadViewSet, BlsOesViewSet

# urlpatterns =[
#     path('', views.index, name='index'),
#     path('<int:soccode>/',views.description, name='description'),
#     path('<str:detail>',views.detail, name = 'detail'),

# ]

router = routers.DefaultRouter()
router.register(r'api/leads', LeadViewSet)
router.register(r'api/v1/soc-codes', BlsOesViewSet)

urlpatterns = router.urls
