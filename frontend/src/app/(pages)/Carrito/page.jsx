'use client';
import PaymentList from '@/app/components/PaymentList';
import ProductCard from '@/app/components/ProductCard';
import { userContext } from '@/app/context/userContext';
import Link from 'next/link';
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
      {usuario.listadoCarrito && usuario.listadoCarrito.length > 0 ? (
        <div className='flex flex-wrap gap-4 justify-between'>
          {usuario.listadoCarrito.map((producto, index) =>
            <ProductCard
              key={index}
              producto={producto}
              tipoDeCartaProducto={'carrito'}
            />
          )}
        </div>
      ) : (
        <div className='flex gap-5 flex-col w-full justify-center items-center bg-gray-100 p-5'>
          No hay productos en el carrito.
          <Link
            href={'/RopaDeportiva'}
            className='bg-green-400 py-1 px-2 rounded text-white hover:bg-green-500'
          >
            Ir al catálogo de Ropa Deportiva
          </Link>
          <Link
            href={'/ProductosDeportivos'}
            className='bg-green-400 py-1 px-2 rounded text-white hover:bg-green-500'
          >
            Ir al catálogo de Productos Deportivos
          </Link>
        </div>
      )}
    </main>
  )
}

export default Carrito;