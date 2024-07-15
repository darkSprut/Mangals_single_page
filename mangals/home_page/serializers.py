from rest_framework.serializers import ModelSerializer
from .models import Message, Product, ImgProduct, MainImgProduct


class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'

    def create(self, validated_data):
        instance = Message(**validated_data)
        return instance


class MainImgProductSerializer(ModelSerializer):

    class Meta:
        model = MainImgProduct
        fields = 'image', 'alt'


class ImgProductSerializer(ModelSerializer):

    class Meta:
        model = ImgProduct
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    images = ImgProductSerializer(many=True)
    main_image = MainImgProductSerializer(many=False)

    class Meta:
        model = Product
        fields = 'title', 'text', 'price', 'images', 'main_image'


class ErrorsSerializer:
    def __init__(self, data):
        self._data = data
        self._serialize_data = self.serialize()

    def serialize(self):
        error_dict = {"errors": {}}
        for key in self._data.keys():
            error_dict["errors"][key] = self._data.get(key)[0].title()
        return error_dict

    def data(self):
        return self._serialize_data
