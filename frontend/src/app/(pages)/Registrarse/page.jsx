import Link from 'next/link';
import React from 'react'

function Registrase() {
    return (
        <main className='grow'>
            <form className='shadow w-1/2 min-w-[400px] m-auto my-10 bg-[#333] p-5 rounded'>
                <h5 className='text-xl text-center text-white'>
                    Registrarse
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
                            Correo
                        </h5>
                        <input
                            placeholder='Correo'
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
                    <button className='bg-green-400 rounded p-1 text-white'>
                        Registrarse
                    </button>
                    <Link href={'/IniciarSesion'} className='text-center text-gray-400 hover:text-white'>
                        ¿Tiene cuenta? <br />
                        Iniciar Sesión
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default Registrase;