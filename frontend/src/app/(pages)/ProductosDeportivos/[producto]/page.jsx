import ProductsFilters from '@/app/components/ProductsFilters';
import ProductCard from '@/app/components/ProductCard';
import React from 'react'

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

function Producto() {
  return (
    <main className='grow flex'>
      <ProductsFilters />
      <div className='flex flex-wrap gap-4 justify-between py-4 pr-3'>
        {PRODUCTOS.map((producto, index) =>
          <ProductCard
            key={index}
            producto={producto}
          />
        )}
      </div>
    </main>
  )
}

export default Producto;