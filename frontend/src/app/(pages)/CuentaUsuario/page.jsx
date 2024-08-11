import ProductCard from '@/app/components/ProductCard';
import UsuarioInfoCard from '@/app/components/UsuarioInfoCard';
import React from 'react';

const PRODUCTOS = [{
  nombreProducto: 'Producto',
  precioProducto: 7000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  nombreProducto: 'Producto',
  precioProducto: 7000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}]

function CuentaUsuario() {
  return (
    <main className='grow p-5 flex gap-5'>
      <UsuarioInfoCard />
      <div className='w-[75vw]'>
        <h5 className='text-xl text-center w-full'>
          Historial de Productos Comprados
        </h5>
        <hr className='my-3' />
        <div className='flex flex-wrap gap-4 justify-between'>
          {PRODUCTOS.map((producto, index) =>
            <ProductCard
              key={index}
              nombreProducto={producto.nombreProducto}
              precioProducto={producto.precioProducto}
              marcaProducto={producto.marcaProducto}
              srcImagen={producto.srcImagen}
              esDeCarrito={true}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CuentaUsuario;