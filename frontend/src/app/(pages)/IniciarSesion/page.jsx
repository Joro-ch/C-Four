import Link from 'next/link';
import React from 'react'

function IniciarSesion() {
  return (
    <main className='grow'>
      <form className='shadow w-1/2 min-w-[400px] m-auto my-10 bg-[#333] p-5 rounded'>
        <h5 className='text-xl text-center text-white'>
          Iniciar Sesión
        </h5>
        <hr className='my-3' />
        <div className='flex flex-col gap-5'>
          <span className='flex flex-col gap-2'>
            <h5 className='text-white'>
              Nombre de Usuario
            </h5>
            <input
              placeholder='Nombre de Usuario'
              className='py-2 px-3 w-full rounded'
            />
          </span>
          <span className='flex flex-col gap-2'>
            <h5 className='text-white'>
              Contraseña
            </h5>
            <input
              placeholder='Contraseña'
              className='py-2 px-3 w-full rounded'
            />
          </span>
          <button className='bg-green-400 rounded p-1 text-white hover:bg-green-500'>
            Iniciar Sesión
          </button>
          <Link href={'/Registrarse'} className='text-center text-gray-400 hover:text-white'>
            ¿No tiene cuenta? <br />
            Registrarse
          </Link> 
        </div>
      </form>
    </main>
  )
}

export default IniciarSesion;