'use client';
import React, { useContext, useEffect, useState } from 'react';
import ProductsFilters from '@/app/components/ProductsFilters';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';
import ProductModal from '@/app/components/ProductModal';
import MessageModal from '@/app/components/MessageModal';
import { SERVICE_URL } from '@/app/constants/global';
import { AGREGAR_PRODUCTO_CARRITO_MODAL_CUERPO, AGREGAR_PRODUCTO_CARRITO_MODAL_TITULO } from '@/app/constants/mensajes';
import { toast } from 'sonner';
import { userContext } from '@/app/context/userContext';

function Producto({ params }) {
  const { usuario } = useContext(userContext);
  const [listadoProductos, setListadoProductos] = useState([]);
  const [listadoMostrado, setListadoMostrado] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [cantidadComprada, setCantidadComprada] = useState(0);

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

  const alAgregarProductosAlCarrito = async (producto) => {
    if (esValidaInfoProducto(producto) && await agregarProductoCarritoRequest(producto)) {
      toast.success('¡Exito!', { description: '¡Se ha agregado correctamente el producto al carrito!' });
      setShowProductModal(false);
      setShowMessageModal(false);
    }
  }

  const esValidaInfoProducto = (producto) => {
    if (usuario.nombreUsuario === '') {
      toast.error('¡Error!', { description: '¡Inicie Sesión o Registrese primero!' });
      return false;
    }
    else if (producto.cantidadDisponible === 0) {
      toast.error('¡Error!', { description: `¡No hay más de este producto disponible!` });
      return false;
    }
    else if (cantidadComprada === 0) {
      toast.error('¡Error!', { description: `¡Ingrese una cantidad superior a cero!` });
      return false;
    }
    else if (producto.cantidadDisponible - cantidadComprada < 0) {
      toast.error('¡Error!', { description: `¡No hay suficientes productos, ingrese una cantidad inferior!` });
      return false;
    }
    return true;
  }

  const agregarProductoCarritoRequest = async (producto) => {
    const response = await fetch(`${SERVICE_URL}/carritoUsuario/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario: usuario.nombreUsuario,
        idProducto: producto.idProducto,
        cantidadComprado: cantidadComprada,
      })
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error('¡Error!', { description: `¡${result.error}!` });
      return false;
    }
    return true;
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
              <>
                <ProductCard
                  key={index}
                  producto={producto}
                  alPresionarIcono={() => setShowMessageModal(true)}
                  alPresionarImagen={() => setShowProductModal(true)}
                  elIconoEsDeCompra={true}
                />
                <ProductModal
                  producto={producto}
                  showModal={showProductModal}
                  setShowModal={setShowProductModal}
                  alPresionarBoton={() => setShowMessageModal(true)}
                  elBotonEsDeCompra={true}
                >
                </ProductModal>
                <MessageModal
                  showModal={showMessageModal}
                  setShowModal={setShowMessageModal}
                  tituloModal={AGREGAR_PRODUCTO_CARRITO_MODAL_TITULO}
                  accionAceptar={() => alAgregarProductosAlCarrito(producto)}
                >
                  <div className='bg-white p-5'>
                    <p>
                      {AGREGAR_PRODUCTO_CARRITO_MODAL_CUERPO}
                    </p>
                    <form className='flex flex-col mt-3'>
                      <p> Si es el caso, ingrese la cantidad que desea ingresar al carrito: </p>
                      <input
                        type='number'
                        className='bg-[#333] text-white p-3 w-full rounded mt-3'
                        placeholder='Cantidad a Comprar'
                        name='cantidadComprado'
                        onChange={(e) => setCantidadComprada(e.target.value)}
                      />
                    </form>
                  </div>
                </MessageModal >
              </>
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