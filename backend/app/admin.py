from django.contrib import admin
from .models import Usuario, Empresa, Producto, HistorialCompraUsuario

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Empresa)
admin.site.register(Producto)
admin.site.register(HistorialCompraUsuario)
