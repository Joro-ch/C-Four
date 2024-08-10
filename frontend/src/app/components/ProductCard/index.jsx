"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import ProductModal from '../ProductModal';
import MessageModal from '../MessageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const MESSAGE_MODAL_TITLE = 'Añadir Producto al Carrito'
const MESSAGE_MODAL_MESSAGE = '¿Está seguro que desea añadir el producto al carrito?';

function ProductCard({ nombreProducto, precioProducto, marcaProducto, srcImagen }) {
    const [showProductModal, setShowProductModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    return (
        <div className='bg-[#333] min-w-[260px] w-[15vw] rounded shadow-xl'>
            <button className='hover:opacity-90' onClick={() => setShowProductModal(true)}>
                <Image
                    src={srcImagen}
                    width={1500}
                    height={1500}
                    className='w-full'
                />
            </button>
            <div className='flex justify-between p-5'>
                <div className='text-white'>
                    <h5>
                        ₡{precioProducto}
                    </h5>
                    <h5 className='text-xs'>
                        {nombreProducto} - {marcaProducto}
                    </h5>
                </div>
                <button className='text-green-400' onClick={() => setShowMessageModal(true)}>
                    <FontAwesomeIcon icon={faCartShopping} className='w-[20px]' />
                </button>
            </div>
            <ProductModal showModal={showProductModal} setShowModal={setShowProductModal} />
            <MessageModal
                showModal={showMessageModal}
                setShowModal={setShowMessageModal}
                modalTitulo={MESSAGE_MODAL_TITLE}
                modalMensaje={MESSAGE_MODAL_MESSAGE}
                accionAceptar={() => {}}
            />
        </div>
    )
}

export default ProductCard