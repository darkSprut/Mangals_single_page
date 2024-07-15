from django.contrib import admin
from django.urls import path, include
from .views import IndexView, MessagesView, ProductsView

urlpatterns = [
    path('', IndexView.as_view(), name='home_page'),
    path('products/<int:count>/', ProductsView.as_view(), name='products'),
    path('submit/', MessagesView.as_view(), name='submit-message'),
]
