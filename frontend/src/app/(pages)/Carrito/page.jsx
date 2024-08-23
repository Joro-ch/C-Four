'use client';
import PaymentList from '@/app/components/PaymentList';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '@/app/context/userContext';
import { SERVICE_URL } from '@/app/constants/global';

function Carrito() {
  const { usuario } = useContext(userContext);
  const [listadoCarrito, setListadoCarrito] = useState([]);

  useEffect(() => {
    restablecerListado();
  }, [usuario]);

  const obtenerListadoCarritoRequest = async () => {
    if (usuario.nombreUsuario == '') return;

    const response = await fetch(`${SERVICE_URL}/carritoUsuario/usuario/${usuario.nombreUsuario}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error('¡Error!', { description: `¡${result.error}!` });
      return [];
    }
    return result;
  }

  const restablecerListado = async () => {
    const listado = await obtenerListadoCarritoRequest();
    setListadoCarrito(listado);
  }

  return (
    <main className='grow p-5 flex gap-5'>
      <PaymentList listadoCompra={listadoCarrito} restablecerListado={restablecerListado} />
      {listadoCarrito && listadoCarrito.length > 0 ? (
        <div className='flex flex-wrap gap-4 justify-around'>
          {listadoCarrito.map((elemento, index) =>
            <ProductCard
              key={index}
              producto={elemento.producto}
              compraId={elemento.id}
              tipoDeCartaProducto={'carrito'}
              restablecerListado={restablecerListado}
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