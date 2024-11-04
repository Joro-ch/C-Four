'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import PaymentList from '@/app/components/PaymentList';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';
import MessageModal from '@/app/components/MessageModal';
import ProductModal from '@/app/components/ProductModal';
import { userContext } from '@/app/context/userContext';
import { SERVICE_URL } from '@/app/constants/global';
import { ELIMINAR_PRODUCTO_MODAL_CUERPO, ELIMINAR_PRODUCTO_MODAL_TITULO } from '@/app/constants/mensajes';
import { toast } from 'sonner';

function Carrito() {
  const { usuario } = useContext(userContext);
  const [listadoCarrito, setListadoCarrito] = useState([]);
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const onSeleccionarProductoIcono = (idIndexProducto) => {
    setShowMessageModal(true);
    setIdProductoSeleccionado(idIndexProducto);
  }

  const onSeleccionarProductoImagen = (idIndexProducto) => {
    setShowProductModal(true);
    setIdProductoSeleccionado(idIndexProducto);
  }

  const obtenerListadoCarritoRequest = useCallback(async () => {
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
  }, [usuario]);

  const restablecerListado = useCallback(async () => {
    const listado = await obtenerListadoCarritoRequest();
    setListadoCarrito(listado);
  }, [obtenerListadoCarritoRequest, setListadoCarrito]);

  useEffect(() => {
    restablecerListado();
  }, [usuario, restablecerListado]);

  const alElliminarProductosDelCarrito = async (compraId) => {
    if (esValidoEliminarProducto() && await eliminarProductoCarritoRequest(compraId)) {
      restablecerListado();
      toast.success('¡Exito!', { description: '¡Se ha eliminado correctamente el producto del carrito!' });
      setShowProductModal(false);
      setShowMessageModal(false);
    }
  }

  const esValidoEliminarProducto = () => {
    if (usuario.nombreUsuario === '') {
      toast.error('¡Error!', { description: '¡Inicie Sesión o Registrese primero!' })
      return false;
    }
    return true;
  }

  const eliminarProductoCarritoRequest = async (compraId) => {
    const response = await fetch(`${SERVICE_URL}/carritoUsuario/${compraId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('¡Error!', { description: `¡No se ha podido eliminar correctamente!` });
      return false;
    }
    return true;
  }

  return (
    <main className='grow p-5 flex gap-5'>
      <PaymentList listadoCompra={listadoCarrito} restablecerListado={restablecerListado} />
      {listadoCarrito && listadoCarrito.length > 0 ? (
        <div className="flex flex-wrap justify-between gap-5">
          {listadoCarrito.map((elemento, index) => (
            <div className="flex flex-wrap gap-4 justify-around" key={index}>
              <ProductCard
                producto={elemento.producto}
                alPresionarIcono={() => onSeleccionarProductoIcono(index)}
                alPresionarImagen={() => onSeleccionarProductoImagen(index)}
                elIconoEsDeCompra={false}
                cantidadComprado={elemento.cantidadComprado}
              />
              <ProductModal
                producto={elemento.producto}
                showModal={showProductModal}
                setShowModal={setShowProductModal}
                alPresionarBoton={() => setShowMessageModal(true)}
                elBotonEsDeCompra={false}
                idProductoSeleccionado={idProductoSeleccionado}
                idIndexProducto={index}
              />
              <MessageModal
                showModal={showMessageModal}
                setShowModal={setShowMessageModal}
                tituloModal={ELIMINAR_PRODUCTO_MODAL_TITULO}
                cuerpoModal={ELIMINAR_PRODUCTO_MODAL_CUERPO}
                accionAceptar={() => alElliminarProductosDelCarrito(elemento.id)}
                idProductoSeleccionado={idProductoSeleccionado}
                idIndexProducto={index}
              />
            </div>
          ))}
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