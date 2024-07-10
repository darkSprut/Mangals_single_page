from django.contrib import admin
from django.urls import path, include
from .views import IndexView, MessagesView

urlpatterns = [
    path('', IndexView.as_view(), name='home_page'),
    path('submit/', MessagesView.as_view(), name='submit-message'),
]
