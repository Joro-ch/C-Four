from django.db import models


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
    precioProducto = models.DecimalField(max_digits=10, decimal_places=2)
    cantidadDisponible = models.IntegerField()
    nombreMarca = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    productoImagen = models.CharField(max_length=255)


class HistorialCompraUsuario(models.Model):
    nombreUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    idProducto = models.ForeignKey(Producto, on_delete=models.CASCADE)


class ProductosMarca(models.Model):
    nombreMarca = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    idProducto = models.ForeignKey(Producto, on_delete=models.CASCADE)