from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from .models import HistorialCompraUsuario

@receiver(pre_save, sender=HistorialCompraUsuario)
def update_product_quantity(sender, instance, **kwargs):
    producto = instance.idProducto
    if producto.cantidadDisponible > 0:
        producto.cantidadDisponible -= 1
        producto.save()
    else:
        raise ValidationError(f"El producto {producto.nombreProducto} no tiene stock disponible.")

