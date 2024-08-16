'use client';
import ProductCard from '@/app/components/ProductCard';
import UsuarioInfoCard from '@/app/components/UsuarioInfoCard';
import { userContext } from '@/app/context/userContext';
import Link from 'next/link';
import React, { useContext } from 'react';

function CuentaUsuario() {
  const { usuario } = useContext(userContext);

  return (
    <main className='grow p-5 flex gap-5'>
      <UsuarioInfoCard />
      <div className='w-[75vw]'>
        <h5 className='text-xl text-center w-full'>
          Historial de Productos Comprados
        </h5>
        <hr className='my-3' />
        <div className='flex flex-wrap gap-4 justify-between'>
          {usuario.listadoProductosComprados && usuario.listadoProductosComprados.length > 0 ? (
            <>
              {usuario.listadoProductosComprados.map((producto, index) =>
                <ProductCard
                  key={index}
                  producto={producto}
                  tipoDeCartaProducto={'historial'}
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