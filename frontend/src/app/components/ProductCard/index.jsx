"use client";
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';

function ProductCard({
    producto,
    alPresionarIcono,
    alPresionarImagen,
    elIconoEsDeCompra = true,
}) {
    return (
        <div className='bg-[#333] min-w-[260px] w-[15vw] max-h-[350px] rounded shadow-xl'>
            <button className='hover:opacity-90 h-[70%] overflow-hidden' onClick={alPresionarImagen}>
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
                <button onClick={alPresionarIcono}>
                    {elIconoEsDeCompra ? (
                        <FontAwesomeIcon icon={faCartShopping} className='w-[20px] text-green-400' />
                    ) : (
                        <FontAwesomeIcon icon={faXmark} className='w-[20px] text-red-400' />
                    )}
                </button>
            </div>
        </div >
    )
}

export default ProductCard;