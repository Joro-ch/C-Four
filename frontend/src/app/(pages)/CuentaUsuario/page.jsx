'use client';
import Link from 'next/link';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import MessageModal from '@/app/components/MessageModal';
import ProductCard from '@/app/components/ProductCard';
import ProductModal from '@/app/components/ProductModal';
import UsuarioInfoCard from '@/app/components/UsuarioInfoCard';
import { SERVICE_URL } from '@/app/constants/global';
import { ELIMINAR_PRODUCTO_HISTORIAL_MODAL_CUERPO, ELIMINAR_PRODUCTO_HISTORIAL_MODAL_TITULO } from '@/app/constants/mensajes';
import { userContext } from '@/app/context/userContext';
import { toast } from 'sonner';

function CuentaUsuario() {
  const { usuario } = useContext(userContext);
  const [listadoCompraUsuario, setListadoCompraUsuario] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const obtenerListadoCompraUsuarioRequest = useCallback(async () => {
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
  }, [usuario]);

  const restablecerListado = useCallback(async () => {
    if (usuario.nombreUsuario != '') {
      const listado = await obtenerListadoCompraUsuarioRequest();
      setListadoCompraUsuario(listado);
    }
  }, [usuario, obtenerListadoCompraUsuarioRequest]);

  useEffect(() => {
    restablecerListado();
  }, [usuario, restablecerListado]);

  const alElliminarProductosDelHistorial = async (compraId) => {
    setShowProductModal(false);
    setShowMessageModal(false);
    if (usuario.nombreUsuario === '') {
      toast.error('¡Error!', { description: '¡Inicie Sesión o Registrese primero!' })
      return
    }
    if (await eliminarProductoHistorialRequest(compraId)) {
      restablecerListado();
      toast.success('¡Exito!', {
        description: '¡Se ha eliminado correctamente el producto del historial!'
      });
    }
  }

  const eliminarProductoHistorialRequest = async (compraId) => {
    const response = await fetch(`${SERVICE_URL}/historialCompraUsuario/${compraId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('¡Error!', { description: `¡No se pudo eliminar el producto del historial!` });
      return false;
    }
    return true;
  }

  return (
    <main className='grow p-5 flex gap-5'>
      <UsuarioInfoCard />
      <div className='w-[75vw]'>
        <h5 className='text-xl text-center w-full'>
          Historial de Productos Comprados
        </h5>
        <hr className='my-3' />
        {listadoCompraUsuario && listadoCompraUsuario.length > 0 ? (
          <div className="flex flex-wrap justify-between gap-5">
            {listadoCompraUsuario.map((compra, index) => (
              <div className="flex flex-wrap gap-4 justify-between" key={index}>
                <ProductCard
                  producto={compra.producto}
                  alPresionarIcono={() => setShowMessageModal(true)}
                  alPresionarImagen={() => setShowProductModal(true)}
                  elIconoEsDeCompra={false}
                  cantidadComprado={compra.cantidadComprado}
                />
                <ProductModal
                  producto={compra.producto}
                  showModal={showProductModal}
                  setShowModal={setShowProductModal}
                  alPresionarBoton={() => setShowMessageModal(true)}
                  elBotonEsDeCompra={false}
                />
                <MessageModal
                  showModal={showMessageModal}
                  setShowModal={setShowMessageModal}
                  tituloModal={ELIMINAR_PRODUCTO_HISTORIAL_MODAL_TITULO}
                  cuerpoModal={ELIMINAR_PRODUCTO_HISTORIAL_MODAL_CUERPO}
                  accionAceptar={() => alElliminarProductosDelHistorial(compra.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5 justify-center items-center bg-gray-100 w-full p-5 min-h-[600px]">
            No hay productos en el historial.
            <Link
              href={'/RopaDeportiva'}
              className="bg-green-400 py-1 px-2 rounded text-white hover:bg-green-500"
            >
              Ir al catálogo de Ropa Deportiva
            </Link>
            <Link
              href={'/ProductosDeportivos'}
              className="bg-green-400 py-1 px-2 rounded text-white hover:bg-green-500"
            >
              Ir al catálogo de Productos Deportivos
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default CuentaUsuario;