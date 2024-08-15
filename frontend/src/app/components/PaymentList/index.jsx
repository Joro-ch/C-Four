'use client';
import React, { useContext, useEffect, useState } from 'react';
import MessageModal from '../MessageModal';
import { userContext } from '@/app/context/userContext';
import { toast } from 'sonner';

const MESSAGE_MODAL_TITLE = 'Realizar la Compra';
const MESSAGE_MODAL_BODY = '¿Está seguro que desea proceder con la compra de los articulos seleccionados?';

function PaymentList({ listadoProductos }) {
    const { comprarProducosDelCarrito } = useContext(userContext);
    const [totalPayment, setTotalPayment] = useState(0);
    const [showMessageModal, setShowMessageModal] = useState(false);

    useEffect(() => {
        const total = listadoProductos ? listadoProductos.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.precioProducto;
        }, 0) : 0;
        setTotalPayment(total);
    }, [listadoProductos]);

    const alComprarProductos = () => {
        comprarProducosDelCarrito();
        setShowMessageModal(false);
        toast.success('¡Exito!', { description: '¡Se compraron los productos correctamente!' })
    }

    return (
        <div className='shadow min-w-[300px] w-[25vw] p-5'>
            <h5 className='text-xl'>
                Lista de Compras
            </h5>
            <hr className='my-3' />
            {listadoProductos && listadoProductos.length > 0 ? (
                <div className='flex flex-col gap-3 min-h-[40vh]'>
                    {listadoProductos.map((producto, index) =>
                        <div className='flex justify-between' key={index}>
                            <h5> {producto.nombreProducto} </h5>
                            <h5> ₡{producto.precioProducto} </h5>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex justify-center items-center bg-gray-100 p-5 text-center h-[40vh]'>
                    Todavía no hay productos en el carrito
                </div>
            )}
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
                accionAceptar={alComprarProductos}
            />
        </div>
    )
}

export default PaymentList;