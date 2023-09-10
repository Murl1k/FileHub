# Generated by Django 4.2.4 on 2023-09-10 08:17

from django.db import migrations, models
import django.db.models.deletion
import shortuuid.main


class Migration(migrations.Migration):

    dependencies = [
        ('cloud_storage', '0002_folder'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='size',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='folder',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='folder',
            name='parent_folder',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='cloud_storage.folder'),
        ),
    ]
