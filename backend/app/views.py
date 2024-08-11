from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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

# ---------------------------------------------------------------------

class LoginView(APIView):
    def post(self, request):
        nombreUsuario = request.data.get("nombreUsuario")
        passwordUsuario = request.data.get("passwordUsuario")

        if not nombreUsuario or not passwordUsuario:
            return Response({"error": "Faltan campos obligatorios (nombreUsuario o passwordUsuario)."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.get(nombreUsuario=nombreUsuario)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        if passwordUsuario == usuario.passwordUsuario:
            # Aquí podrías generar un token o simplemente devolver una respuesta de éxito
            return Response({"mensaje": "Autenticación exitosa"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)