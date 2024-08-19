import { empresaContext } from '@/app/context/empresaContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'

function Footer() {
  const { empresa } = useContext(empresaContext);

  return (
    <div className='bg-[#333] text-white py-5 px-9 border-t-2 border-black-800 flex justify-between flex-wrap'>
      <div className='flex flex-col items-center gap-3'>
        <Image
          src={'/C-FourIcon.webp'}
          width={1500}
          height={1500}
          className='w-[150px] h-[150px] rounded-full'
          alt=''
          priority={true}
        />
        C-Four
      </div>
      <div>
        <h5> Ropa Deportiva </h5>
        <hr className='my-2' />
        <ul className='flex flex-col'>
          <Link href={'/RopaDeportiva/Camisas'} className='hover:underline hover:opacity-85 duration-500'>
            Camisas
          </Link>
          <Link href={'/RopaDeportiva/Pantalones'} className='hover:underline hover:opacity-85 duration-500'>
            Pantalones
          </Link>
          <Link href={'/RopaDeportiva/Sueters'} className='hover:underline hover:opacity-85 duration-500'>
            Sueters
          </Link>
          <Link href={'/RopaDeportiva/Zapatos'} className='hover:underline hover:opacity-85 duration-500'>
            Zapatos
          </Link>
          <Link href={'/RopaDeportiva/Medias'} className='hover:underline hover:opacity-85 duration-500'>
            Medias
          </Link>
        </ul>
      </div>
      <div>
        <h5> Productos Deportivos </h5>
        <hr className='my-2' />
        <ul className='flex flex-col'>
          <Link href={'/ProductosDeportivos/Botellas'} className='hover:underline hover:opacity-85 duration-500'>
            Botellas
          </Link>
          <Link href={'/ProductosDeportivos/Suplementos'} className='hover:underline hover:opacity-85 duration-500'>
            Suplementos
          </Link>
          <Link href={'/ProductosDeportivos/Complementos'} className='hover:underline hover:opacity-85 duration-500'>
            Complementos
          </Link>
          <Link href={'/ProductosDeportivos/Equipamiento'} className='hover:underline hover:opacity-85 duration-500'>
            Equipamiento
          </Link>
        </ul>
      </div>
      <div className='mr-[8vw]'>
        <h5> Otro </h5>
        <hr className='my-2' />
        <ul className='flex flex-col'>
          <Link href={'/SobreNosotros'} className='hover:underline hover:opacity-85 duration-500'>
            Sobre Nosotros
          </Link>
          {empresa.nombreMarca == '' && (
            <Link href={'/Empresas'} className='hover:underline hover:opacity-85 duration-500'>
              Empresas
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Footer;