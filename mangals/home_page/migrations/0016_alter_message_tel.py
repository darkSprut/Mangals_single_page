# Generated by Django 5.0.6 on 2024-07-13 12:05

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_page', '0015_alter_message_email_alter_message_message_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='tel',
            field=models.TextField(validators=[django.core.validators.RegexValidator(message='Недопустимое значение для телефона, формат +7 999 999 99 99', regex='\\+7 \\d{3} \\d{3} \\d{2} \\d{2}')]),
        ),
    ]
