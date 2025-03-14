# Generated by Django 5.1 on 2024-08-16 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CarritoUsuario',
            new_name='HistorialCompraUsuario',
        ),
        migrations.RenameField(
            model_name='empresa',
            old_name='passwordUsuario',
            new_name='passwordMarca',
        ),
        migrations.AlterField(
            model_name='empresa',
            name='correoMarca',
            field=models.EmailField(error_messages={'unique': 'Ya existe una marca con este correo electrónico'}, max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='empresa',
            name='nombreMarca',
            field=models.CharField(error_messages={'unique': 'Ya existe una marca con este nombre'}, max_length=255, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='correoUsuario',
            field=models.EmailField(error_messages={'unique': 'Ya existe un usuario con este correo electrónico'}, max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='nombreUsuario',
            field=models.CharField(error_messages={'unique': 'Ya existe un usuario con este nombre'}, max_length=255, primary_key=True, serialize=False),
        ),
    ]
