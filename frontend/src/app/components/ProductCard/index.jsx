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
    tipoDeCartaProducto = '',
    compraId = 0,
    restablecerListado
}) {
    const { usuario } = useContext(userContext);
    const [cantidadComprada, setCantidadComprada] = useState(0);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const alAgregarProductosAlCarrito = async () => {
        if (esValidaInfoProducto() && await agregarProductoCarritoRequest()) {
            toast.success('¡Exito!', { description: '¡Se ha agregado correctamente el producto al carrito!' });
            setShowProductModal(false);
            setShowMessageModal(false);
        }
    }

    const esValidaInfoProducto = () => {
        console.log(cantidadComprada)
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

    const agregarProductoCarritoRequest = async () => {
        console.log({
            nombreUsuario: usuario.nombreUsuario,
            idProducto: producto.idProducto,
            cantidadComprada: cantidadComprada,
        })
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

    const alElliminarProductosDelCarrito = async () => {
        if (esValidoEliminarProducto() && await eliminarProductoCarritoRequest()) {
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

    const eliminarProductoCarritoRequest = async () => {
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

    const alElliminarProductosDelHistorial = async () => {
        setShowProductModal(false);
        setShowMessageModal(false);
        if (usuario.nombreUsuario === '') {
            toast.error('¡Error!', { description: '¡Inicie Sesión o Registrese primero!' })
            return
        }
        if (await eliminarProductoHistorialRequest()) {
            restablecerListado();
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
                    alt=''
                    priority={true}
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
                tituloModal={tipoDeCartaProducto === 'carrrito' ? (
                    ELIMINAR_PRODUCTO_MODAL_TITULO
                ) : tipoDeCartaProducto === 'historial' ? (
                    ELIMINAR_PRODUCTO_HISTORIAL_MODAL_TITULO
                ) : (
                    AGREGAR_PRODUCTO_CARRITO_MODAL_TITULO
                )}
                accionAceptar={tipoDeCartaProducto === 'carrito' ? (
                    () => alElliminarProductosDelCarrito()
                ) : tipoDeCartaProducto === 'historial' ? (
                    () => alElliminarProductosDelHistorial()
                ) : (
                    () => alAgregarProductosAlCarrito()
                )}
            >
                <div className='bg-white p-5'>
                    <p>
                        {tipoDeCartaProducto === 'carrrito' ? (
                            ELIMINAR_PRODUCTO_MODAL_CUERPO
                        ) : tipoDeCartaProducto === 'historial' ? (
                            ELIMINAR_PRODUCTO_HISTORIAL_MODAL_CUERPO
                        ) : (
                            AGREGAR_PRODUCTO_CARRITO_MODAL_CUERPO
                        )}
                    </p>
                    {tipoDeCartaProducto === '' && (
                        <form className='flex flex-col mt-3'>
                            <p> Si es el caso, ingrese la cantidad que desea ingresar al carrito: </p>
                            <input
                                type='number'
                                className='bg-[#333] text-white p-3 w-full rounded mt-3'
                                placeholder='Cantidad a Comprar'
                                name='cantidadComprado'
                                onChange={(e) => setCantidadComprada(parseInt(e.target.value, 10))}
                            />
                        </form>
                    )}
                </div>
            </MessageModal >
        </div >
    )
}

export default ProductCard;