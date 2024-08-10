from rest_framework import viewsets
from .models import Usuario, Empresa, TipoProducto, Producto, CarritoUsuario, ProductosMarca
from .serializer import UsuarioSerializer, EmpresaSerializer, TipoProductoSerializer, ProductoSerializer
from .serializer import CarritoUsuarioSerializer, ProductosMarcaSerializer

# Create your views here.
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class TipoProductoViewSet(viewsets.ModelViewSet):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class CarritoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = CarritoUsuario.objects.all()
    serializer_class = CarritoUsuarioSerializer

class ProductosMarcaViewSet(viewsets.ModelViewSet):
    queryset = ProductosMarca.objects.all()
    serializer_class = ProductosMarcaSerializer