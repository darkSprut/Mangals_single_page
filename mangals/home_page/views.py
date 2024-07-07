from django.shortcuts import render
from django.views.generic.base import TemplateView
from .models import Data
# Create your views here.


class IndexView(TemplateView):
    template_name = "home_page/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context["data"] = Data.objects.first()
        return context

