from rest_framework.serializers import ModelSerializer
from .models import Message


class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'

    def create(self, validated_data):
        instance = Message(**validated_data)
        return instance


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
