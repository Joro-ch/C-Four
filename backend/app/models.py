from django.db import models

class Usuario(models.Model):
    idUsuario = models.CharField(max_length=255, primary_key=True)
    nombreUsuario = models.CharField(max_length=255)
    correoUsuario = models.EmailField(max_length=255)
    passwordUsuario = models.CharField(max_length=255)

class Empresa(models.Model):
    idEmpresa = models.CharField(max_length=255, primary_key=True)
    nombreMarca = models.CharField(max_length=255)
    passwordUsuario = models.CharField(max_length=255)

class TipoProducto(models.Model):
    idTipo = models.CharField(max_length=255, primary_key=True)
    nombreTipo = models.CharField(max_length=255)

class Producto(models.Model):
    idProducto = models.CharField(max_length=255, primary_key=True)
    nombreProducto = models.CharField(max_length=255)
    tipoProducto = models.ForeignKey(TipoProducto, on_delete=models.CASCADE)
    precioProducto = models.DecimalField(max_digits=10, decimal_places=2)
    cantidadDisponible = models.IntegerField()
    nombreMarca = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    productoImagen = models.CharField(max_length=255)

class CarritoUsuario(models.Model):
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    idProducto = models.ForeignKey(Producto, on_delete=models.CASCADE)

class ProductosMarca(models.Model):
    idEmpresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    idProducto = models.ForeignKey(Producto, on_delete=models.CASCADE)
