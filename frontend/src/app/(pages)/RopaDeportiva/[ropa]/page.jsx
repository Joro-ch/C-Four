'use client';
import ProductsFilters from '@/app/components/ProductsFilters';
import ProductCard from '@/app/components/ProductCard';
import React, { useState } from 'react'

const PRODUCTOS = [{
  idProducto: 1,
  nombreProducto: 'Producto 1',
  precioProducto: 7000,
  marcaProducto: 'Marca 1',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 2,
  nombreProducto: 'Producto 2',
  precioProducto: 8000,
  marcaProducto: 'Marca 1',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 3,
  nombreProducto: 'Producto 3',
  precioProducto: 8000,
  marcaProducto: 'Marca 1',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 4,
  nombreProducto: 'Producto 4',
  precioProducto: 8000,
  marcaProducto: 'Marca 2',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 5,
  nombreProducto: 'Producto 5',
  precioProducto: 7000,
  marcaProducto: 'Marca 2',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 6,
  nombreProducto: 'Producto 6',
  precioProducto: 8000,
  marcaProducto: 'Marca 2',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 7,
  nombreProducto: 'Producto 7',
  precioProducto: 8000,
  marcaProducto: 'Marca 3',
  srcImagen: '/C-FourIcon.webp',
}, {
  idProducto: 8,
  nombreProducto: 'Producto 8',
  precioProducto: 8000,
  marcaProducto: 'Marca 3',
  srcImagen: '/C-FourIcon.webp',
}]

function Ropa() {
  const [listadoProductos, setListadoProductos] = useState(PRODUCTOS);
  const [listadoMostrado, setListadoMostrado] = useState(PRODUCTOS);

  return (
    <main className='grow flex'>
      <ProductsFilters
        listadoProductos={listadoProductos}
        listadoMostrado={listadoMostrado}
        setListadoMostrado={setListadoMostrado} 
      />
      <div className='flex flex-wrap gap-4 justify-between py-4 pr-3'>
        {listadoMostrado.map((producto, index) =>
          <ProductCard
            key={index}
            producto={producto}
          />
        )}
      </div>
    </main>
  )
}

export default Ropa;