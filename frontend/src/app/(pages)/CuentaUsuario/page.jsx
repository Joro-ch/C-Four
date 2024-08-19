'use client';
import ProductCard from '@/app/components/ProductCard';
import UsuarioInfoCard from '@/app/components/UsuarioInfoCard';
import { SERVICE_URL } from '@/app/constants/global';
import { userContext } from '@/app/context/userContext';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

function CuentaUsuario() {
  const { usuario } = useContext(userContext);
  const [listadoCompraUsuario, setListadoCompraUsuario] = useState([]);

  useEffect(() => {
    restablecerListadoProductos();
  }, [usuario]);

  const obtenerListadoCompraUsuarioRequest = async () => {
    const response = await fetch(`${SERVICE_URL}/historialCompraUsuario/usuario/${usuario.nombreUsuario}/`, {
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

  const restablecerListadoProductos = async () => {
    const listado = await obtenerListadoCompraUsuarioRequest();
    setListadoCompraUsuario(listado);
  }

  return (
    <main className='grow p-5 flex gap-5'>
      <UsuarioInfoCard />
      <div className='w-[75vw]'>
        <h5 className='text-xl text-center w-full'>
          Historial de Productos Comprados
        </h5>
        <hr className='my-3' />
        <div className='flex flex-wrap gap-4 justify-between'>
          {listadoCompraUsuario && listadoCompraUsuario.length > 0 ? (
            <>
              {listadoCompraUsuario.map((compra, index) =>
                <ProductCard
                  key={index}
                  producto={compra.producto}
                  tipoDeCartaProducto={'historial'}
                  compraId={compra.id}
                  restablecerListadoProductos={restablecerListadoProductos}
                />
              )}
            </>
          ) : (
            <div className='flex flex-col gap-5 justify-center items-center bg-gray-100 w-full p-5 min-h-[600px] '>
              No hay productos en el historial.
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
        </div>
      </div>
    </main>
  )
}

export default CuentaUsuario;