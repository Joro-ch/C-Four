'use client';
import EmpresaInfoCard from '@/app/components/EmpresaInfoCard'
import ProductsList from '@/app/components/ProductsList'
import ToolBar from '@/app/components/ToolBar'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SERVICE_URL } from '@/app/constants/global';
import { empresaContext } from '@/app/context/empresaContext';
import { toast } from 'sonner';

function AdministrarMarca() {
  const { empresa } = useContext(empresaContext);
  const [listadoProductos, setListadoProductos] = useState([]);
  const [listadoProductosMostrados, setListadoProductosMostrados] = useState(listadoProductos);

  const obtenerListadoProductosRequest = useCallback(async () => {
    const response = await fetch(`${SERVICE_URL}/productos/marca/${empresa.nombreMarca}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error('¡Error!', { description: `¡${result.error}!` });
      return null;
    }
    return result;
  }, [empresa]);

  const restablecerListadoProductos = useCallback(async () => {
    if (empresa.nombreMarca !== '') {
      const nuevoListadoProductos = await obtenerListadoProductosRequest();
      setListadoProductos(nuevoListadoProductos);
      setListadoProductosMostrados(nuevoListadoProductos);
    }
  }, [empresa, obtenerListadoProductosRequest]);

  useEffect(() => {
    restablecerListadoProductos();
  }, [empresa, restablecerListadoProductos]);

  const buscarProducto = (nombreProducto) => {
    setListadoProductosMostrados(listadoProductos.filter(
      producto => producto.nombreProducto === nombreProducto
    ));
    if (listadoProductos.length > 0) {
      toast.success('¡Exito!', { description: '¡Se ha filtrado correctamente!' });
    }
  }

  return (
    <main className='grow p-5 flex gap-5'>
      <EmpresaInfoCard />
      <div className='flex flex-col gap-2 w-full'>
        <ToolBar
          restablecerListadoProductos={restablecerListadoProductos}
          buscarProducto={buscarProducto}
        />
        <ProductsList
          listadoProductos={listadoProductosMostrados}
          restablecerListadoProductos={restablecerListadoProductos}
        />
      </div>
    </main>
  )
}

export default AdministrarMarca;