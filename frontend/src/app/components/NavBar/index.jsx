'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { userContext } from '@/app/context/userContext';
import { empresaContext } from '@/app/context/empresaContext';
import { faCartShopping, faDumbbell, faShirt, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavBar() {
    const { usuario } = useContext(userContext);
    const { empresa } = useContext(empresaContext);

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
                {usuario.nombreUsuario != '' ? (
                    <>
                        <li className='hover:opacity-85 duration-500'>
                            <Link href={'/Carrito'} className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faCartShopping} className='w-[20px] h-[20px]' />
                                <h5 className='text-nowrap'>
                                    {usuario.listadoCarrito ? usuario.listadoCarrito.length : 0}
                                </h5>
                            </Link>
                        </li>
                        <li className='hover:opacity-85 duration-500'>
                            <Link href={'/CuentaUsuario'} className='flex items-center gap-2'>
                                <h5 className='text-nowrap bg-white text-black rounded-full w-[25px] h-[25px] text-center'>
                                    {usuario.nombreUsuario[0]}
                                </h5>
                            </Link>
                        </li>
                    </>
                ) : empresa.nombreMarca != '' ? (
                    <li className='hover:opacity-85 duration-500'>
                        <Link href={'/Empresas/AdministrarMarca'} className='flex items-center gap-2'>
                            <h5 className='text-nowrap bg-white text-black rounded-full w-[25px] h-[25px] text-center'>
                                {empresa.nombreMarca[0]}
                            </h5>
                        </Link>
                    </li>
                ) : (
                    <li className='hover:opacity-85 duration-500'>
                        <Link href={'/IniciarSesion'} className='flex items-center gap-2'>
                            <FontAwesomeIcon icon={faSignIn} className='w-[20px] h-[20px]' />
                            Iniciar Sesión
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;