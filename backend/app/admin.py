from django.contrib import admin
from .models import Usuario, Empresa, Producto, CarritoUsuario, HistorialCompraUsuario

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Empresa)
admin.site.register(Producto)
admin.site.register(CarritoUsuario)
admin.site.register(HistorialCompraUsuario)
