# Generated by Django 5.1.2 on 2024-10-24 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('armstrong_app', '0005_alter_attempt_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='attempt',
            unique_together={('user', 'attempted_number')},
        ),
    ]
