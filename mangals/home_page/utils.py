from datetime import datetime as dt
from rest_framework.serializers import Serializer


def example_work_upload(instance, filename):
    now = dt.now()
    return 'examples/{Y}/{m}/{d}/{filename}'.format(
        Y=now.strftime("%Y"),
        m=now.strftime("%m"),
        d=now.strftime("%d"),
        filename=filename,
    )


def main_img_product_upload(instance, filename):
    now = dt.now()
    return 'product/main_img/{Y}/{m}/{d}/{filename}'.format(
        Y=now.strftime("%Y"),
        m=now.strftime("%m"),
        d=now.strftime("%d"),
        filename=filename,
    )


def img_product_upload(instance, filename):
    now = dt.now()
    return 'product/img/{Y}/{m}/{d}/{filename}'.format(
        Y=now.strftime("%Y"),
        m=now.strftime("%m"),
        d=now.strftime("%d"),
        filename=filename,
    )


def bild_message(data: dict) -> str:
    message = ''
    for key, val in data.items():
        message += (f'<div style="width: 100%; background-color: #008080; '
                    f'color: #F5FFFA; padding: 7px; font-size: 25px;">{key}: {val}</div>')
    return message
