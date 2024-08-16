'use client';
import PaymentList from '@/app/components/PaymentList';
import ProductCard from '@/app/components/ProductCard';
import { userContext } from '@/app/context/userContext';
import React, { useContext } from 'react';

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

function Carrito() {
  const { usuario } = useContext(userContext);

  return (
    <main className='grow p-5 flex gap-5'>
      <PaymentList listadoProductos={usuario.listadoCarrito} />
      <div className='flex flex-wrap gap-4 justify-between'>
        {usuario.listadoCarrito && usuario.listadoCarrito.map((producto, index) =>
          <ProductCard
            key={index}
            producto={producto}
            tipoDeCartaProducto={'carrito'}
          />
        )}
      </div>
    </main>
  )
}

export default Carrito;