import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function ProductCard({ nombreProducto, precioProducto, marcaProducto, srcImagen}) {
    return (
        <div className='bg-[#333] min-w-[260px] w-[15vw] rounded shadow-xl'>
            <button className='hover:opacity-90'>
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
        </div>
    )
}

export default ProductCard