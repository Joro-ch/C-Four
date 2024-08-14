"use client";
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import ProductModal from '../ProductModal';
import MessageModal from '../MessageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { userContext } from '@/app/context/userContext';
import { toast } from 'sonner';

const ADD_PRODUCT_MODAL_TITLE = 'Añadir Producto al Carrito';
const ADD_PRODUCT_MODAL_BODY = '¿Está seguro que desea añadir el producto al carrito?';
const ERASE_PRODUCT_MODAL_TITLE = 'Eliminar Producto del Carrito';
const ERASE_PRODUCT_MODAL_BODY = '¿Está seguro que desea eliminar el producto del carrito?';

function ProductCard({ producto, esDeCarrito = false }) {
    const { usuario, agregarProductoListadoCarrito, eliminarProductoListadoCarrito } = useContext(userContext);
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

    return (
        <div className='bg-[#333] min-w-[260px] w-[15vw] rounded shadow-xl'>
            <button className='hover:opacity-90' onClick={() => setShowProductModal(true)}>
                <Image
                    src={producto.srcImagen}
                    width={1500}
                    height={1500}
                    className='w-full'
                />
            </button>
            <div className='flex justify-between p-5'>
                <div className='text-white'>
                    <h5>
                        ₡{producto.precioProducto}
                    </h5>
                    <h5 className='text-xs'>
                        {producto.nombreProducto} - {producto.marcaProducto}
                    </h5>
                </div>
                <button onClick={() => setShowMessageModal(true)}>
                    {esDeCarrito ? (
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
                esDeCarrito={esDeCarrito}
                alAgregarProductosAlCarrito={alAgregarProductosAlCarrito}
                alElliminarProductosDelCarrito={alElliminarProductosDelCarrito}
            />
            <MessageModal
                showModal={showMessageModal}
                setShowModal={setShowMessageModal}
                modalTitulo={esDeCarrito ? (
                    ERASE_PRODUCT_MODAL_TITLE
                ) : (
                    ADD_PRODUCT_MODAL_TITLE
                )}
                modalMensaje={esDeCarrito ? (
                    ERASE_PRODUCT_MODAL_BODY
                ) : (
                    ADD_PRODUCT_MODAL_BODY
                )}
                accionAceptar={esDeCarrito ? (
                    () => alElliminarProductosDelCarrito()
                ) : (
                    () => alAgregarProductosAlCarrito()
                )}
            />
        </div>
    )
}

export default ProductCard;