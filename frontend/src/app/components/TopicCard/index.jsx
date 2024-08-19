import React from 'react';
import Image from "next/image";
import Link from "next/link";

function TopicCard({ nombreTema, srcImagen, hrefTema }) {
    return (
        <div className='bg-[#333] w-1/3 shadow-xl rounded hover:opacity-85'>
            <Link href={hrefTema}>
                <Image
                    src={srcImagen}
                    height={1500}
                    width={1500}
                    className='w-full'
                    alt=''
                    priority={true}
                />
                <h5 className='p-3 text-white text-center'>
                    {nombreTema}
                </h5>
            </Link>
        </div>
    )
}

export default TopicCard;