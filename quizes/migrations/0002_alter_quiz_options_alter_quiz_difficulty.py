# Generated by Django 4.1.7 on 2023-02-22 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quiz',
            options={'verbose_name': 'Тест', 'verbose_name_plural': 'Тесты'},
        ),
        migrations.AlterField(
            model_name='quiz',
            name='difficulty',
            field=models.CharField(choices=[('easy', 'easy'), ('hard', 'hard'), ('medium', 'medium')], max_length=6),
        ),
    ]
