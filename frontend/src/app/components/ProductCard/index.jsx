"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ProductModal from '../ProductModal';

function ProductCard({ nombreProducto, precioProducto, marcaProducto, srcImagen}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='bg-[#333] min-w-[260px] w-[15vw] rounded shadow-xl'>
            <button className='hover:opacity-90' onClick={() => setShowModal(true)}>
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
                <button className='text-green-400'>
                    <FontAwesomeIcon icon={faCartShopping} className='w-[20px]' />
                </button>
            </div>
            <ProductModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default ProductCard