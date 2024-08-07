import React from 'react';
import Image from "next/image";
import Link from "next/link";

function TopicCard({ nombreProducto, hrefImagen }) {
    return (
        <div className='bg-[#333] w-1/4 shadow-xl rounded hover:opacity-85'>
            <Link href={'/'}>
                <Image
                    src={'/C-FourIcon.webp'}
                    height={1500}
                    width={1500}
                    className='w-full'
                />
                <h5 className='p-3 text-white text-center'>
                    Producto
                </h5>
            </Link>
        </div>
    )
}

export default TopicCard;