# Generated by Django 5.1 on 2024-08-21 23:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_historialcomprausuario_cantidadcomprado'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarritoUsuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidadComprado', models.IntegerField()),
                ('idProducto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.producto')),
                ('nombreUsuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.usuario')),
            ],
        ),
    ]
