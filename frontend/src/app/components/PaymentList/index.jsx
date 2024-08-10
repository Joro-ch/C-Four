'use client';
import React, { useEffect, useState } from 'react';
import MessageModal from '../MessageModal';

const PRODUCTOS = [{
    nombreProducto: 'Producto',
    precioProducto: 7000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}, {
    nombreProducto: 'Producto',
    precioProducto: 7000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
}]

const MESSAGE_MODAL_TITLE = 'Realizar la Compra';
const MESSAGE_MODAL_BODY = '¿Está seguro que desea proceder con la compra de los articulos seleccionados?';

function PaymentList() {
    const [totalPayment, setTotalPayment] = useState(0);
    const [showMessageModal, setShowMessageModal] = useState(false);

    useEffect(() => {
        const total = PRODUCTOS.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.precioProducto;
        }, 0);
        setTotalPayment(total);
    }, [PRODUCTOS]);

    return (
        <div className='shadow min-w-[300px] w-[25vw] p-5'>
            <h5 className='text-xl'>
                Lista de Compras
            </h5>
            <hr className='my-3' />
            <div className='flex flex-col gap-3'>
                {PRODUCTOS.map((producto, index) =>
                    <div className='flex justify-between' key={index}>
                        <h5> {producto.nombreProducto} </h5>
                        <h5> ₡{producto.precioProducto} </h5>
                    </div>
                )}
            </div>
            <hr className='my-3' />
            <div className='flex justify-between'>
                <button
                    className='bg-green-400 px-2 py-1 rounded text-white hover:opacity-85'
                    onClick={() => setShowMessageModal(true)}
                >
                    Comprar
                </button>
                <h5> Total: ₡{totalPayment}
                </h5>
            </div>
            <MessageModal
                showModal={showMessageModal}
                setShowModal={setShowMessageModal}
                modalTitulo={MESSAGE_MODAL_TITLE}
                modalMensaje={MESSAGE_MODAL_BODY}
                accionAceptar={() => { }}
            />
        </div>
    )
}

export default PaymentList;