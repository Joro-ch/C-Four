from rest_framework import serializers
from .models import Usuario, Empresa, TipoProducto, Producto, CarritoUsuario, ProductosMarca

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class CarritoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarritoUsuario
        fields = '__all__'

class ProductosMarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductosMarca
        fields = '__all__'