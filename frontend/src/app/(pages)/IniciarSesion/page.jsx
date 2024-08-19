'use client';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { SERVICE_URL } from '@/app/constants/global';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userContext } from '@/app/context/userContext';

function IniciarSesion() {
  const { setUsuario } = useContext(userContext);

  const router = useRouter();
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombreUsuario: '',
    correoUsuario: '',
    passwordUsuario: '',
  });

  const onLogIn = async (e) => {
    e.preventDefault();
    if (checkValidUser()) {
      const usuarioInfo = await logInRequest();
      if (usuarioInfo) {
        setUsuario(usuarioInfo);
        toast.success('¡Exito!', { description: '¡Ha iniciado sesion correctamente!' });
        router.push('/');
      }
    }
  }

  const checkValidUser = () => {
    if (nuevoUsuario.nombreUsuario === '') {
      toast.error('¡Error!', { description: '¡El campo nombre de usuario no puede estar vacío!' });
      return false;
    }
    else if (nuevoUsuario.passwordUsuario === '') {
      toast.error('¡Error!', { description: '¡El campo contraseña no puede estar vacío!' });
      return false;
    }
    return true;
  }

  const logInRequest = async () => {
    const response = await fetch(`${SERVICE_URL}/iniciarSesion/usuario/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario)
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error('¡Error!', { description: `¡${result.error}!` })
      return null;
    }

    return result.usuario;
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
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombreUsuario: e.target.value })}
              placeholder='Nombre de Usuario'
              className='py-2 px-3 w-full rounded'
              name='nombreUsuario'
            />
          </span>
          <span className='flex flex-col gap-2'>
            <h5 className='text-white'>
              Contraseña
            </h5>
            <input
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, passwordUsuario: e.target.value })}
              placeholder='Contraseña'
              className='py-2 px-3 w-full rounded'
              type='password'
              name='passwordUsuario'
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