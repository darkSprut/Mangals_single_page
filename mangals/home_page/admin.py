from django.contrib import admin
from .models import Data


# Register your models here.
@admin.register(Data)
class DataAdmin(admin.ModelAdmin):
    list_display = ["pk", "site_name", "tel"]
    list_display_links = ["site_name"]
