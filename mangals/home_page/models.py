from django.db import models
from django.core.validators import ValidationError

# Create your models here.


class Data(models.Model):
    site_name = models.CharField(max_length=50)
    tel = models.IntegerField()

    class Meta:
        verbose_name = 'Данные сайта'
        verbose_name_plural = 'Данные сайта'

    def __str__(self):
        return "Общая информация"

    def clean(self):
        instanse = Data.objects.all()
        count = instanse.count()
        if count >= 1:
            instanse.delete()
        super().clean()


