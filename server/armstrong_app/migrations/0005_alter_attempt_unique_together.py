# Generated by Django 5.1.2 on 2024-10-22 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('armstrong_app', '0004_alter_attempt_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='attempt',
            unique_together=set(),
        ),
    ]