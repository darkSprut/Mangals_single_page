from django.contrib import admin
from .models import Data, ExamplesOfWorks, Product, MainImgProduct, ImgProduct, Message
import gettext


# Register your models here.
@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ["pk", "tel", "name", "message", "created_at"]
    list_display_links = ["pk", "tel"]
    readonly_fields = ["name", "tel", "email", "message", "created_at"]


@admin.register(Data)
class DataAdmin(admin.ModelAdmin):
    list_display = ["pk", "site_name", "tel"]
    list_display_links = ["pk", "site_name"]


@admin.register(ExamplesOfWorks)
class ExamplesOfWorksAdmin(admin.ModelAdmin):
    list_display = ["pk", "created_at", ]
    list_display_links = ["pk", "created_at"]


class MainImageProductInline(admin.TabularInline):
    model = MainImgProduct
    extra = 1


class ImageProductInline(admin.TabularInline):
    model = ImgProduct
    extra = 10


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["pk", "title", "created_at", "available",]
    list_display_links = ["pk", "title"]
    inlines = [MainImageProductInline, ImageProductInline]
    list_editable = ["available"]
    actions = ["available_false", "available_true"]

    fieldsets = [
        (
            "Заголовок", {
                "fields": ["title"],
            }
        ),
        (
            "Текст", {
                "fields": ["text"],
            },
        ),
        (
            "Цена", {
                "fields": ["price"],
            },
        ),
        (
            "Доступно/Недоступно", {
                "fields": ["available"],
            },
        )
    ]

    @admin.action(description="Сделать недоступными")
    def available_false(self, request, queryset):
        queryset.update(available=False)
        self.message_user(request, "Выбранные товары недоступны")

    @admin.action(description="Сделать доступными")
    def available_true(self, request, queryset):
        queryset.update(available=True)
        self.message_user(request, "Выбранные товары доступны")
