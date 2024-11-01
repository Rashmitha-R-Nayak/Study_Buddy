from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import PDFViewSet

router = DefaultRouter()
router.register(r"pdfs", PDFViewSet, basename="pdf")

urlpatterns = [
    # This results in URLs like /pdfs/, /pdfs/<id>/, etc., which are mapped to actions in PDFViewSet
    path("" , include(router.urls))
]

