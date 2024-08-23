'use client';
import React, { useContext, useEffect, useState } from 'react';
import MessageModal from '../MessageModal';
import { userContext } from '@/app/context/userContext';
import { toast } from 'sonner';
import { REALIZAR_COMPRA_MODAL_CUERPO, REALIZAR_COMPRA_MODAL_TITULO } from '@/app/constants/mensajes';
import { SERVICE_URL } from '@/app/constants/global';

function PaymentList({ listadoCompra, restablecerListado }) {
    const { usuario } = useContext(userContext);
    const [totalPayment, setTotalPayment] = useState(0);
    const [showMessageModal, setShowMessageModal] = useState(false);

    useEffect(() => {
        const total = listadoCompra ? listadoCompra.reduce((accumulator, registroActual) => {
            const precioProducto = registroActual.producto.precioProducto;
            const cantidadCompardo = registroActual.cantidadComprado;
            return accumulator + (precioProducto * cantidadCompardo);
        }, 0) : 0;
        setTotalPayment(total);
    }, [listadoCompra]);

    const alComprarProductos = async () => {
        if (await realizarCompraRequest()) {
            restablecerListado();
            setShowMessageModal(false);
            toast.success('¡Exito!', { description: '¡Se compraron los productos correctamente!' });
        }
    }

    const realizarCompraRequest = async () => {
        if (usuario.nombreUsuario == '') return;

        const response = await fetch(`${SERVICE_URL}/transferir-carrito/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreUsuario: usuario.nombreUsuario })
        });

        const result = await response.json();
        if (!response.ok) {
            toast.error('¡Error!', { description: `¡${result.error}!` });
            return false;
        }
        return true;
    }

    return (
        <div className='shadow min-w-[300px] w-[25vw] p-5'>
            <h5 className='text-xl'>
                Lista de Compras
            </h5>
            <hr className='my-3' />
            {listadoCompra && listadoCompra.length > 0 ? (
                <>
                    <div className='flex flex-col gap-3 min-h-[40vh]'>
                        {listadoCompra.map((elemento, index) =>
                            <div className='flex justify-between' key={index}>
                                <h5>{elemento.producto.nombreProducto}</h5>
                                <h5> x{elemento.cantidadComprado}  </h5>
                                <h5> ₡{elemento.producto.precioProducto * elemento.cantidadComprado} </h5>
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
                        tituloModal={REALIZAR_COMPRA_MODAL_TITULO}
                        accionAceptar={alComprarProductos}
                    >
                        <p className='p-5 bg-white'>
                            {REALIZAR_COMPRA_MODAL_CUERPO}
                        </p>
                    </MessageModal>
                </>
            ) : (
                <div className='flex justify-center items-center bg-gray-100 p-5 text-center h-[40vh]'>
                    Todavía no hay productos en el carrito.
                </div>
            )}
        </div>
    )
}

export default PaymentList;