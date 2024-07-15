import re
from django.core.validators import ValidationError


def tel_ru_validator(value):
    if re.fullmatch(r'\+7\d{10}', value):
        return True
    else:
        raise ValidationError("Недопустимое значение для телефона")

