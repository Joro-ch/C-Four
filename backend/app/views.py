from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.hashers import check_password, make_password
from .models import Usuario, Empresa, Producto, HistorialCompraUsuario
from .serializer import UsuarioSerializer, EmpresaSerializer, ProductoSerializer
from .serializer import HistorialCompraUsuarioSerializer

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class HistorialCompraUsuarioViewSet(viewsets.ModelViewSet):
    queryset = HistorialCompraUsuario.objects.all()
    serializer_class = HistorialCompraUsuarioSerializer


# ---------------------------------------------------------------------


class LoginUsuarioView(APIView):
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
            usuario_serializer = UsuarioSerializer(usuario)
            return Response({"mensaje": "Autenticación exitosa", "usuario": usuario_serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
        

class LoginEmpresaView(APIView):
    def post(self, request):
        nombreMarca = request.data.get("nombreMarca")
        passwordMarca = request.data.get("passwordMarca")

        if not nombreMarca or not passwordMarca:
            return Response({"error": "Faltan campos obligatorios (nombreMarca o passwordMarca)."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            empresa = Empresa.objects.get(nombreMarca=nombreMarca)
        except Empresa.DoesNotExist:
            return Response({"error": "Empresa no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        if passwordMarca == empresa.passwordMarca:
            # Aquí podrías generar un token o simplemente devolver una respuesta de éxito
            empresa_serializer = EmpresaSerializer(empresa)
            return Response({"mensaje": "Autenticación exitosa", "empresa": empresa_serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
        

class CambiarPasswordUsuarioView(APIView):
    def post(self, request):
        nombreUsuario = request.data.get("nombreUsuario")
        passwordActual = request.data.get("passwordActual")
        passwordNueva = request.data.get("passwordNueva")

        if not nombreUsuario or not passwordActual or not passwordNueva:
            return Response({"error": "Faltan campos obligatorios (nombreUsuario, passwordActual o passwordNueva)"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.get(nombreUsuario=nombreUsuario)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Verificar si la contraseña actual es correcta
        if passwordActual == usuario.passwordUsuario:
            # Actualizar la contraseña con la nueva
            usuario.passwordUsuario = passwordNueva
            usuario.save()

            return Response({"mensaje": "Contraseña actualizada exitosamente"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Contraseña actual incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
        

class CambiarPasswordEmpresaView(APIView):
    def post(self, request):
        nombreMarca = request.data.get("nombreMarca")
        passwordActual = request.data.get("passwordActual")
        passwordNueva = request.data.get("passwordNueva")

        if not nombreMarca or not passwordActual or not passwordNueva:
            return Response({"error": "Faltan campos obligatorios (nombreMarca, passwordActual o passwordNueva)"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            empresa = Empresa.objects.get(nombreMarca=nombreMarca)
        except Empresa.DoesNotExist:
            return Response({"error": "Empresa no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Verificar si la contraseña actual es correcta
        if passwordActual == empresa.passwordMarca:
            # Actualizar la contraseña con la nueva
            empresa.passwordMarca = passwordNueva
            empresa.save()

            return Response({"mensaje": "Contraseña actualizada exitosamente"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Contraseña actual incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)


class ProductosPorMarcaView(generics.ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        nombre_marca = self.kwargs['nombreMarca']
        return Producto.objects.filter(nombreMarca__nombreMarca=nombre_marca)


class ProductosPorTipoView(generics.ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        tipoProducto = self.kwargs['tipoProducto']
        return Producto.objects.filter(tipoProducto=tipoProducto)
    
    
class HistorialCompraPorUsuarioView(generics.ListAPIView):
    serializer_class = HistorialCompraUsuarioSerializer

    def get_queryset(self):
        nombreUsuario = self.kwargs['nombreUsuario']
        return HistorialCompraUsuario.objects.filter(nombreUsuario=nombreUsuario)