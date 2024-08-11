'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { SERVICE_URL } from '@/app/constants/global';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function IniciarSesion() {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    nombreUsuario: '',
    passwordUsuario: '',
  });

  const onLogIn = async (e) => {
    e.preventDefault();
    if (checkValidUser() && await logInRequest())
      router.push('/')
  }

  const checkValidUser = () => {
    if (usuario.nombreUsuario === '') {
      toast.error('¡Error!', { description: '¡El campo nombre de usuario no puede estar vacío!' });
      return false;
    }
    else if (usuario.passwordUsuario === '') {
      toast.error('¡Error!', { description: '¡El campo contraseña no puede estar vacío!' });
      return false;
    }
    return true;
  }

  const logInRequest = async () => {
    const response = await fetch(`${SERVICE_URL}/iniciarSesion/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });

    if (!response.ok) {
      const result = await response.json();
      toast.error('¡Error!', { description: `¡${result.error}!` })
      return false;
    }

    return true;
  }

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
              onChange={(e) => setUsuario({ ...usuario, nombreUsuario: e.target.value })}
              placeholder='Nombre de Usuario'
              className='py-2 px-3 w-full rounded'
            />
          </span>
          <span className='flex flex-col gap-2'>
            <h5 className='text-white'>
              Contraseña
            </h5>
            <input
              onChange={(e) => setUsuario({ ...usuario, passwordUsuario: e.target.value })}
              placeholder='Contraseña'
              className='py-2 px-3 w-full rounded'
            />
          </span>
          <button
            className='bg-green-400 rounded p-1 text-white hover:bg-green-500'
            type='submit'
            onClick={onLogIn}
          >
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