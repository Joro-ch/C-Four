"use client";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import useIsBrowser from '@/app/hooks/useIsBrowser';
import MessageModal from '../MessageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AGREGAR_PRODUCTO_CARRITO_MODAL_CUERPO, AGREGAR_PRODUCTO_CARRITO_MODAL_TITULO, ELIMINAR_PRODUCTO_HISTORIAL_MODAL_CUERPO, ELIMINAR_PRODUCTO_HISTORIAL_MODAL_TITULO, ELIMINAR_PRODUCTO_MODAL_CUERPO, ELIMINAR_PRODUCTO_MODAL_TITULO } from '@/app/constants/mensajes';

function ProductModal({
    producto,
    showModal,
    setShowModal,
    tipoDeCartaProducto,
    alAgregarProductosAlCarrito,
    alElliminarProductosDelCarrito,
    alElliminarProductosDelHistorial,
}) {
    const { isBrowser } = useIsBrowser();
    const [showMessageModal, setShowMessageModal] = useState(false);

    const onClose = () => setShowModal(!showModal);

    const MODAL = showModal ? (
        <>
            <button
                className='fixed top-0 left-0 bg-[#333] w-full h-full opacity-15'
                onClick={onClose}
            />
            <div className='flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[90vh] w-[60vw] bg-[#333] shadow rounded'>
                <div className='h-[80%]'>
                    <Image
                        src={producto.productoImagen}
                        width={1500}
                        height={1500}
                        className='h-full rounded-t shadow'
                        alt=''
                        priority={true}
                    />
                    <button
                        className='fixed top-0 right-0 my-4 mx-5 text-xl shadow rounded-full w-[30px] h-[30px] bg-white'
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className='flex justify-between flex-wrap items-center text-white h-full px-10'>
                    <div>
                        <h5 className='text-3xl'>
                            ₡{producto.precioProducto}
                        </h5>
                        <h5 className='text-xl'>
                            {producto.nombreProducto} - {producto.nombreMarca}
                        </h5>
                    </div>
                    <div className='flex gap-5'>
                        <button
                            className='text-xl hover:opacity-85 w-[1/2]'
                            onClick={() => setShowMessageModal(true)}
                        >
                            {tipoDeCartaProducto === 'carrito' || tipoDeCartaProducto === 'historial' ? (
                                <div className='bg-red-400 rounded p-4 flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faXmark} />
                                    Eliminar
                                </div>
                            ) : (
                                <div className='bg-green-400 rounded p-4 flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    Comprar
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <MessageModal
                showModal={showMessageModal}
                setShowModal={setShowMessageModal}
                tituloModal={tipoDeCartaProducto === 'carrrito' ? (
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
        </>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            MODAL,
            document.body
        )
    }

    return null;
}

export default ProductModal