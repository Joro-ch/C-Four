from django.urls import path, include
from rest_framework import routers
from app import views

router=routers.DefaultRouter()

router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'empresas', views.EmpresaViewSet)
router.register(r'tiposProducto', views.TipoProductoViewSet)
router.register(r'productos', views.ProductoViewSet)
router.register(r'carritoUsuario', views.CarritoUsuarioViewSet)
router.register(r'productosMarca', views.ProductosMarcaViewSet)

urlpatterns=[
    path('', include(router.urls))
]