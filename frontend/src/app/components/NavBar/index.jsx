import { faCartShopping, faDumbbell, faShirt, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function NavBar() {
    return (
        <nav className='bg-[#333] text-white py-5 px-9 flex border-b-2 border-black-800'>
            <ul className='w-full flex items-center justify-between flex-wrap'>
                <li className='hover:opacity-85 duration-500'>
                    <Link href={'/'} className='flex gap-5 justify-center items-center'>
                        <Image
                            src={'/C-FourIcon.webp'}
                            width={1500}
                            height={1500}
                            className='w-[40px] h-[40px] rounded-full'
                        />
                        <h5 className='text-xl'>
                            C-Four
                        </h5>
                    </Link>
                </li>
                <li className='hover:opacity-85 duration-500'>
                    <Link href={'/RopaDeportiva'} className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faShirt} className='w-[20px] h-[20px]' />
                        <h5 className='text-nowrap'>
                            Ropa Deportiva
                        </h5>
                    </Link>
                </li>
                <li className='hover:opacity-85 duration-500'>
                    <Link href={'/ProductosDeportivos'} className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faDumbbell} className='w-[20px] h-[20px]' />
                        <h5 className='text-nowrap'>
                            Productos Deportivos
                        </h5>
                    </Link>
                </li>
                <li className='hover:opacity-85 duration-500'>
                    <Link href={'/Carrito'} className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faCartShopping} className='w-[20px] h-[20px]' />
                        <h5 className='text-nowrap'>
                            0
                        </h5>
                    </Link>
                </li>
                <li className='hover:opacity-85 duration-500'>
                    <Link href={'/IniciarSesion'} className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faSignIn} className='w-[20px] h-[20px]' />
                        Iniciar Sesión
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;