from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import PDFViewSet ,UserRegistrationViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r"pdfs", PDFViewSet, basename="pdf")
router.register(r"register", UserRegistrationViewSet  ,  basename="register")

urlpatterns = [
    # This results in URLs like /pdfs/, /pdfs/<id>/, etc., which are mapped to actions in PDFViewSet
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("" , include(router.urls))
]

