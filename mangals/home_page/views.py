from django.views.generic.base import TemplateView, View
from .models import Data, ExamplesOfWorks, Product
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .serializers import MessageSerializer, ErrorsSerializer, ProductSerializer
from django.core.mail import send_mail
from .utils import bild_message
# Create your views here.


class IndexView(TemplateView):
    template_name = "home_page/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context["data"] = Data.objects.first()
        context["example_work"] = ExamplesOfWorks.objects.all()
        return context


class ProductsView(ListAPIView):
    serializer_class = ProductSerializer
    product_in_page = 2

    def get_queryset(self):
        step = self.kwargs.get("count")
        end = self.product_in_page + step
        queryset = (Product.objects.filter(available=True)
                    .select_related("main_image")
                    .prefetch_related("images")[0:end])
        return queryset


class MessagesView(APIView):

    def post(self, request: Request) -> Response:
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer_data = serializer.validated_data
            instance = serializer.create(serializer.validated_data)
            instance.save()
            message = bild_message(serializer_data)
            send_mail(subject='Сообщение с сайта', message=message, html_message=message,
                      recipient_list=['accountkazakov@yandex.ru'], from_email='accountkazakov@yandex.ru')
            return Response()

        else:
            serialize_errors_data = ErrorsSerializer(serializer.errors).data()
            return Response(data=serialize_errors_data)
