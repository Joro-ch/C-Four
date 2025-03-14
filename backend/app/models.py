from django.db import models
from django.core.exceptions import ValidationError

class Usuario(models.Model):
    nombreUsuario = models.CharField(
        max_length=255,
        primary_key=True,
        error_messages={
            'unique': "Ya existe un usuario con este nombre"
        }
    )
    correoUsuario = models.EmailField(
        max_length=255,
        unique=True,
        error_messages={
            'unique': "Ya existe un usuario con este correo electrónico"
        }
    )
    passwordUsuario = models.CharField(max_length=255)


class Empresa(models.Model):
    nombreMarca = models.CharField(
        max_length=255,
        primary_key=True,
        error_messages={
            'unique': "Ya existe una marca con este nombre"
        }
    )
    correoMarca = models.EmailField(
        max_length=255,
        unique=True,
        error_messages={
            'unique': "Ya existe una marca con este correo electrónico"
        }
    )
    passwordMarca = models.CharField(max_length=255)


class Producto(models.Model):
    idProducto = models.AutoField(primary_key=True)
    nombreProducto = models.CharField(max_length=255)
    tipoProducto = models.CharField(max_length=255)
    precioProducto = models.IntegerField()
    cantidadDisponible = models.IntegerField()
    nombreMarca = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    productoImagen = models.TextField()


class CarritoUsuario(models.Model):
    nombreUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    idProducto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidadComprado = models.IntegerField()


class HistorialCompraUsuario(models.Model):
    nombreUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    idProducto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidadComprado = models.IntegerField()

    def save(self, *args, **kwargs):
        producto = self.idProducto
        if producto.cantidadDisponible > 0:
            super().save(*args, **kwargs)
        else:
            raise ValidationError(f"El producto {producto.nombreProducto} no tiene stock disponible.")
