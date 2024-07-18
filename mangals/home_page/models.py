from django.db import models
from .utils import *
from django.core.validators import (MinLengthValidator, EmailValidator,
                                    MaxLengthValidator, RegexValidator)
from .validators import tel_ru_validator
from django.utils.html import mark_safe
# Create your models here.


class Data(models.Model):
    site_name = models.CharField(max_length=50)
    tel = models.IntegerField()
    about_us = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name = 'Данные сайта'
        verbose_name_plural = 'Данные сайта'

    def __str__(self):
        return "Общая информация"

    def clean(self):
        instance = Data.objects.all()
        if instance.exists():
            instance.delete()
        super().clean()


class ExamplesOfWorks(models.Model):
    image = models.ImageField(upload_to=example_work_upload)
    alt = models.CharField(max_length=12, default="example_work", editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Пример работы'
        verbose_name_plural = 'Примеры работ'

    # def image_tag(self):
    #     return mark_safe('<img src="%s" width="60px" height="60px" />' % (self.image.url))
    #
    # image_tag.short_description = 'Image'


class MainImgProduct(models.Model):
    image = models.ImageField(upload_to=main_img_product_upload)
    alt = models.CharField(max_length=50, default="img")
    product = models.OneToOneField("Product", related_name="main_image",  on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Главное изображение'


class ImgProduct(models.Model):
    image = models.ImageField(upload_to=img_product_upload)
    alt = models.CharField(max_length=50, default="img")
    product = models.ForeignKey("Product", related_name="images",  on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'


class Product(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=9, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f'Товар_№{self.pk}'

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ["-created_at"]


class Message(models.Model):
    name = models.CharField(max_length=50, validators=[
        MinLengthValidator(limit_value=2, message="Длина имени не может быть меньше двух знаков")
    ])
    email = models.EmailField(validators=[
        EmailValidator(message="Недопустимое значение для email")
    ])
    tel = models.TextField(validators=[
        RegexValidator(regex=r'\+7 \d{3} \d{3} \d{2} \d{2}', message="Недопустимое значение для телефона, формат +7 999 999 99 99")
    ])
    message = models.TextField(validators=[
        MinLengthValidator(limit_value=10, message="Сообщение меньше 10 знаков")
    ])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        ordering = ["-created_at"]

    def __str__(self):
        return f'Сообщение №{self.pk}'

