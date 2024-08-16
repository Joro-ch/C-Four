'use client';
import ProductCard from '@/app/components/ProductCard';
import UsuarioInfoCard from '@/app/components/UsuarioInfoCard';
import { userContext } from '@/app/context/userContext';
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
          {usuario.listadoProductosComprados && usuario.listadoProductosComprados.map((producto, index) =>
            <ProductCard
              key={index}
              producto={producto}
              tipoDeCartaProducto={'historial'}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CuentaUsuario;