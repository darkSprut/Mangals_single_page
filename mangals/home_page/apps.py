from django.apps import AppConfig
from django.db.models.signals import post_delete, pre_delete
from .signals import del_image


class HomePageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'home_page'

    def ready(self):
        super().ready()
        pre_delete.connect(del_image, sender='home_page.ExamplesOfWorks')
        pre_delete.connect(del_image, sender='home_page.MainImgProduct')
        pre_delete.connect(del_image, sender='home_page.ImgProduct')
