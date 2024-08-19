'use client';
import PaymentList from '@/app/components/PaymentList';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';
import React, { useContext } from 'react';
import { userContext } from '@/app/context/userContext';

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