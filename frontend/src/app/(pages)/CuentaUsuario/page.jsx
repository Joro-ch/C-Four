import ProductCard from '@/app/components/ProductCard';
import UsuarioInfoCard from '@/app/components/UsuarioInfoCard';
import React from 'react';

const PRODUCTOS = [{
  idProducto: 1,
  nombreProducto: 'Producto',
  precioProducto: 7000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 2,
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 3,
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 4,
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 5,
  nombreProducto: 'Producto',
  precioProducto: 7000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 6,
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 7,
  nombreProducto: 'Producto',
  precioProducto: 8000,
  marcaProducto: 'Marca',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 8,
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
              producto={producto}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CuentaUsuario;