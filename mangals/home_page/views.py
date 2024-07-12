from django.shortcuts import render
from django.views.generic.base import TemplateView, View
from .models import Data, ExamplesOfWorks, Product
from django.http import HttpResponse, HttpRequest
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from .serializers import MessageSerializer, ErrorsSerializer

# Create your views here.


class IndexView(TemplateView):
    template_name = "home_page/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context["data"] = Data.objects.first()
        context["example_work"] = ExamplesOfWorks.objects.all()
        context["products"] = Product.objects.filter(available=True).select_related("main_image").prefetch_related("images")
        return context


class MessagesView(APIView):

    def post(self, request: Request) -> Response:
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.create(serializer.validated_data)
            instance.save()
            return Response()
        else:
            serialize_errors_data = ErrorsSerializer(serializer.errors).data()
            return Response(data=serialize_errors_data)



