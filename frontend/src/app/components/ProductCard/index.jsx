"use client";
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import ProductModal from '../ProductModal';
import MessageModal from '../MessageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { userContext } from '@/app/context/userContext';
import { toast } from 'sonner';
import {
    AGREGAR_PRODUCTO_CARRITO_MODAL_CUERPO,
    AGREGAR_PRODUCTO_CARRITO_MODAL_TITULO,
    ELIMINAR_PRODUCTO_HISTORIAL_MODAL_CUERPO,
    ELIMINAR_PRODUCTO_HISTORIAL_MODAL_TITULO,
    ELIMINAR_PRODUCTO_MODAL_CUERPO,
    ELIMINAR_PRODUCTO_MODAL_TITULO
} from '@/app/constants/mensajes';
import { SERVICE_URL } from '@/app/constants/global';

function ProductCard({
    producto,
    tipoDeCartaProducto,
    compraId = 0,
    restablecerListadoProductos
}) {
    const {
        usuario,
        agregarProductoListadoCarrito,
        eliminarProductoListadoCarrito,
    } = useContext(userContext);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const alAgregarProductosAlCarrito = () => {
        setShowProductModal(false);
        setShowMessageModal(false);
        if (usuario.nombreUsuario === '') {
            toast.error('¡Error!', { description: '¡Inicie Sesión o Registrese primero!' });
        }
        else {
            agregarProductoListadoCarrito(producto);
            toast.success('¡Exito!', { description: '¡Se ha agregado correctamente el producto al carrito!' })
        }
    }

    const alElliminarProductosDelCarrito = () => {
        setShowProductModal(false);
        setShowMessageModal(false);
        if (usuario.nombreUsuario === '') {
            toast.error('¡Error!', { description: '¡Inicie Sesión o Registrese primero!' })
        }
        else {
            eliminarProductoListadoCarrito(producto.idProducto);
            toast.success('¡Exito!', { description: '¡Se ha eliminado correctamente el producto del carrito!' })
        }
    }

    const alElliminarProductosDelHistorial = async () => {
        setShowProductModal(false);
        setShowMessageModal(false);
        if (usuario.nombreUsuario === '') {
            toast.error('¡Error!', { description: '¡Inicie Sesión o Registrese primero!' })
            return
        }
        if (await eliminarProductoHistorialRequest()) {
            restablecerListadoProductos();
            toast.success('¡Exito!', {
                description: '¡Se ha eliminado correctamente el producto del historial!'
            });
        }
    }

    const eliminarProductoHistorialRequest = async () => {
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
        <div className='bg-[#333] min-w-[260px] w-[15vw] max-h-[350px] rounded shadow-xl'>
            <button className='hover:opacity-90 h-[70%] overflow-hidden' onClick={() => setShowProductModal(true)}>
                <Image
                    src={producto.productoImagen}
                    width={1500}
                    height={1500}
                    className='w-full rounded-t'
                />
            </button>
            <div className='flex justify-between p-5 '>
                <div className='text-white'>
                    <h5>
                        ₡{producto.precioProducto}
                    </h5>
                    <h5 className='text-xs'>
                        {producto.nombreProducto} - {producto.nombreMarca}
                    </h5>
                </div>
                <button onClick={() => setShowMessageModal(true)}>
                    {tipoDeCartaProducto === 'carrito' || tipoDeCartaProducto === 'historial' ? (
                        <FontAwesomeIcon icon={faXmark} className='w-[20px] text-red-400' />
                    ) : (
                        <FontAwesomeIcon icon={faCartShopping} className='w-[20px] text-green-400' />
                    )}

                </button>
            </div>
            <ProductModal
                producto={producto}
                showModal={showProductModal}
                setShowModal={setShowProductModal}
                tipoDeCartaProducto={tipoDeCartaProducto}
                alAgregarProductosAlCarrito={alAgregarProductosAlCarrito}
                alElliminarProductosDelCarrito={alElliminarProductosDelCarrito}
                alElliminarProductosDelHistorial={alElliminarProductosDelHistorial}
            />
            <MessageModal
                showModal={showMessageModal}
                setShowModal={setShowMessageModal}
                modalTitulo={tipoDeCartaProducto === 'carrrito' ? (
                    ELIMINAR_PRODUCTO_MODAL_TITULO
                ) : tipoDeCartaProducto === 'historial' ? (
                    ELIMINAR_PRODUCTO_HISTORIAL_MODAL_TITULO
                ) : (
                    AGREGAR_PRODUCTO_CARRITO_MODAL_TITULO
                )}
                modalMensaje={tipoDeCartaProducto === 'carrrito' ? (
                    ELIMINAR_PRODUCTO_MODAL_CUERPO
                ) : tipoDeCartaProducto === 'historial' ? (
                    ELIMINAR_PRODUCTO_HISTORIAL_MODAL_CUERPO
                ) : (
                    AGREGAR_PRODUCTO_CARRITO_MODAL_CUERPO
                )}
                accionAceptar={tipoDeCartaProducto === 'carrito' ? (
                    () => alElliminarProductosDelCarrito()
                ) : tipoDeCartaProducto === 'historial' ? (
                    () => alElliminarProductosDelHistorial()
                ) : (
                    () => alAgregarProductosAlCarrito()
                )}
            />
        </div>
    )
}

export default ProductCard;