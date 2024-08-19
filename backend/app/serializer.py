from rest_framework import serializers
from .models import Usuario, Empresa, Producto, HistorialCompraUsuario


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


class HistorialCompraUsuarioSerializer(serializers.ModelSerializer):
    idProducto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())
    producto = ProductoSerializer(source='idProducto', read_only=True)

    class Meta:
        model = HistorialCompraUsuario
        fields = ['id', 'nombreUsuario', 'idProducto', 'producto']