'use client';
import ProductsFilters from '@/app/components/ProductsFilters';
import ProductCard from '@/app/components/ProductCard';
import React, { useEffect, useState } from 'react'
import { SERVICE_URL } from '@/app/constants/global';
import Link from 'next/link';

function Producto({ params }) {
  const [listadoProductos, setListadoProductos] = useState([]);
  const [listadoMostrado, setListadoMostrado] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      const listado = await obtenerListadoProductosRequest();
      setListadoProductos(listado);
      setListadoMostrado(listado);
    }

    getProductos();
  }, [params]);

  const obtenerListadoProductosRequest = async () => {
    const response = await fetch(`${SERVICE_URL}/productos/tipo/${params.producto}/`, {
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

  return (
    <main className='grow flex'>
      {listadoProductos.length > 0 ? (
        <>
          <ProductsFilters
            listadoProductos={listadoProductos}
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
        </>
      ) : (
        <div className='flex flex-col gap-5 justify-center items-center bg-gray-100 w-full h-[70vh]'>
          No hay productos de este tipo.
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

export default Producto;