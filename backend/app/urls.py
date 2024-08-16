from django.urls import path, include
from rest_framework import routers
from app import views

router=routers.DefaultRouter()

router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'empresas', views.EmpresaViewSet)
router.register(r'productos', views.ProductoViewSet)
router.register(r'historialCompraUsuario', views.HistorialCompraUsuarioViewSet)
router.register(r'productosMarca', views.ProductosMarcaViewSet)

urlpatterns=[
    path('', include(router.urls)),
    path('iniciarSesionUsuario/', views.LoginUsuarioView.as_view(), name='login'),
    path('iniciarSesionEmpresa/', views.LoginEmpresaView.as_view(), name='login'),
]