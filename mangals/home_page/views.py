from django.views.generic.base import TemplateView
from .models import Data, ExamplesOfWorks, Product
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import MessageSerializer, ErrorsSerializer
from django.core.mail import send_mail
from .utils import bild_message
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



