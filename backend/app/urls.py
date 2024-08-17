from django.urls import path, include
from rest_framework import routers
from app import views

router=routers.DefaultRouter()

router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'empresas', views.EmpresaViewSet)
router.register(r'productos', views.ProductoViewSet)
router.register(r'historialCompraUsuario', views.HistorialCompraUsuarioViewSet)

urlpatterns=[
    path('', include(router.urls)),
    path('iniciarSesionUsuario/', views.LoginUsuarioView.as_view(), name='login'),
    path('iniciarSesionEmpresa/', views.LoginEmpresaView.as_view(), name='login'),
    path('productos/marca/<str:nombreMarca>/', views.ProductosPorMarcaView.as_view(), name='productos_por_marca'),
    path('cambiarPassword/usuario/', views.CambiarPasswordUsuarioView.as_view(), name='password'),
    path('cambiarPassword/empresa/', views.CambiarPasswordEmpresaView.as_view(), name='password'),
]