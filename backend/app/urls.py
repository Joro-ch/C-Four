from django.urls import path, include
from rest_framework import routers
from app import views

router=routers.DefaultRouter()

router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'empresas', views.EmpresaViewSet)
router.register(r'productos', views.ProductoViewSet)
router.register(r'carritoUsuario', views.CarritoUsuarioViewSet)
router.register(r'historialCompraUsuario', views.HistorialCompraUsuarioViewSet)

urlpatterns=[
    path('', include(router.urls)),
    path('iniciarSesion/usuario/', views.LoginUsuarioView.as_view(), name='login'),
    path('iniciarSesion/empresa/', views.LoginEmpresaView.as_view(), name='login'),
    path('cambiarPassword/usuario/', views.CambiarPasswordUsuarioView.as_view(), name='password'),
    path('cambiarPassword/empresa/', views.CambiarPasswordEmpresaView.as_view(), name='password'),
    path('productos/marca/<str:nombreMarca>/', views.ProductosPorMarcaView.as_view(), name='productos_por_marca'),
    path('productos/tipo/<str:tipoProducto>/', views.ProductosPorTipoView.as_view(), name='productos_por_tipo'),
    path('historialCompraUsuario/usuario/<str:nombreUsuario>/', 
         views.HistorialCompraPorUsuarioView.as_view(), 
         name='historial_compra_por_usuario'),
    path('carritoUsuario/usuario/<str:nombreUsuario>/', 
         views.CarritoUsuarioPorNombreUsuarioView.as_view(), 
         name='carrito_por_usuario'),
     path('transferir-carrito/', views.TransferirCarritoAHistorialView.as_view(), name='transferir-carrito'),
]