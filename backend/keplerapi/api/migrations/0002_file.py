# Generated by Django 3.0.3 on 2020-02-16 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('originalName', models.CharField(max_length=50)),
                ('url', models.CharField(max_length=255)),
            ],
        ),
    ]
