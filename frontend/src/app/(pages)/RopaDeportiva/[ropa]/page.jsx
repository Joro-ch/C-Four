import Filters from '@/app/components/Filters';
import ProductCard from '@/app/components/ProductCard';
import React from 'react'

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

function Ropa() {
  return (
    <main className='grow flex'>
      <Filters />
      <div className='flex flex-wrap gap-4 justify-between py-4 pr-3'>
        {PRODUCTOS.map((producto, index) =>
          <ProductCard
            key={index}
            nombreProducto={producto.nombreProducto}
            precioProducto={producto.precioProducto}
            marcaProducto={producto.marcaProducto}
            srcImagen={producto.srcImagen}
          />
        )}
      </div>
    </main>
  )
}

export default Ropa;