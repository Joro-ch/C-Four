import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function Empresas() {
  return (
    <main className='grow'>
      <article>
        <section className='flex flex-col justify-center items-center gap-5 h-[70dvh]'>
          <h1 className='text-6xl text-center'>
            C-Four <br />
            Para Empresas
          </h1>
          <p> Vende tus productos con la tienda #1! </p>
        </section>
        <section className='bg-[#333] flex flex-wrap-reverse gap-5 py-7 px-10 text-white justify-between'>
          <div className='flex flex-col w-[500px]'>
            <h5 className='text-4xl'>
              Registra tu Empresa en C-Four
            </h5>
            <hr className='my-3' />
            <form className='min-w-[400px] bg-[#333]'>
              <div className='flex flex-col gap-5'>
                <span className='flex flex-col gap-2'>
                  <h5 className='text-white'>
                    Nombre de la Marca
                  </h5>
                  <input
                    placeholder='Nombre de Usuario'
                    className='py-2 px-3 w-full rounded'
                  />
                </span>
                <span className='flex flex-col gap-2'>
                  <h5 className='text-white'>
                    Correo Institucional
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
                <button className='bg-green-400 rounded p-1 text-white hover:bg-green-500'>
                  Registrar
                </button>
              </div>
            </form>
          </div>
          <div className='w-[700px] shadow'>
            <Image
              src={'/C-FourIcon.webp'}
              width={1500}
              height={1500}
              className='h-[70vh]'
            />
          </div>
        </section>
        <section className='flex flex-wrap gap-5 py-7 px-10 text-white justify-between text-black'>
          <div className='w-[700px] shadow'>
            <Image
              src={'/C-FourIcon.webp'}
              width={1500}
              height={1500}
              className='h-[70vh]'
            />
          </div>
          <div className='flex flex-col w-[500px] text-black'>
            <h5 className='text-4xl'>
              Administrar Mi Marca
            </h5>
            <hr className='my-3' />
            <form className='min-w-[400px] rounded'>
              <div className='flex flex-col gap-5'>
                <span className='flex flex-col gap-2'>
                  <h5>
                    Nombre de la Marca
                  </h5>
                  <input
                    placeholder='Nombre de Usuario'
                    className='py-2 px-3 w-full rounded bg-[#333]'
                  />
                </span>
                <span className='flex flex-col gap-2'>
                  <h5>
                    Contraseña
                  </h5>
                  <input
                    placeholder='Contraseña'
                    className='py-2 px-3 w-full rounded bg-[#333]'
                  />
                </span>
                <button className='bg-green-400 rounded p-1 text-white hover:bg-green-500'>
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </section>
      </article>
    </main>
  )
}

export default Empresas;