from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Usuario, Empresa, Producto, CarritoUsuario, HistorialCompraUsuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class CarritoUsuarioSerializer(serializers.ModelSerializer):
    idProducto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())
    producto = ProductoSerializer(source='idProducto', read_only=True)

    class Meta:
        model = CarritoUsuario
        fields = ['id', 'nombreUsuario', 'idProducto', 'cantidadComprado', 'producto']


class HistorialCompraUsuarioSerializer(serializers.ModelSerializer):
    idProducto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())
    producto = ProductoSerializer(source='idProducto', read_only=True)

    class Meta:
        model = HistorialCompraUsuario
        fields = ['id', 'nombreUsuario', 'idProducto',  'cantidadComprado', 'producto']


class TransferirCarritoAHistorialSerializer(serializers.Serializer):
    nombreUsuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    def validate_usuario_id(self, value):
        if not CarritoUsuario.objects.filter(nombreUsuario=value).exists():
            raise ValidationError("El usuario no tiene productos en su carrito.")
        return value

    def save(self):
        usuario = self.validated_data['nombreUsuario']
        carrito_items = CarritoUsuario.objects.filter(nombreUsuario=usuario)

        for item in carrito_items:
            historial_item = HistorialCompraUsuario(
                nombreUsuario=usuario,
                idProducto=item.idProducto,
                cantidadComprado=item.cantidadComprado
            )
            historial_item.save()

            # Disminuir la cantidad disponible del producto
            item.idProducto.cantidadDisponible -= item.cantidadComprado
            item.idProducto.save()

        # Eliminar todos los productos del carrito del usuario
        carrito_items.delete()