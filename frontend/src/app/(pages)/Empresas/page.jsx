'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { SERVICE_URL } from '@/app/constants/global';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { empresaContext } from '@/app/context/empresaContext';

function Empresas() {
  const router = useRouter();
  const { setEmpresa } = useContext(empresaContext);
  const [nuevaEmpresaFormData, setNuevaEmpresaFormData] = useState({
    nombreMarca: '',
    correoMarca: '',
    passwordMarca: '',
  });
  const [empresaFormData, setEmpresaFormData] = useState({
    nombreMarca: '',
    passwordMarca: '',
  })

  const alRegistrarEmpresa = (e) => {
    e.preventDefault();
    if (revisarValidezNuevaEmpresa() && registrarMarcaRequest()) {
      setEmpresa(nuevaEmpresaFormData);
      toast.success('¡Exito!', { description: '¡Se ha registrado correctamente la empresa!' });
      router.push('/Empresas/AdministrarMarca');
    }
  }

  const revisarValidezNuevaEmpresa = () => {
    if (nuevaEmpresaFormData.nombreMarca === '') {
      toast.error('¡Error!', { description: '¡El campo nombre de marca no puede estar vacío!' });
      return false;
    }
    else if (nuevaEmpresaFormData.correoMarca === '') {
      toast.error('¡Error!', { description: '¡El campo correo no puede estar vacío!' });
      return false;
    }
    else if (nuevaEmpresaFormData.passwordMarca === '') {
      toast.error('¡Error!', { description: '¡El campo contraseña no puede estar vacío!' });
      return false;
    }
    return true;
  }

  const registrarMarcaRequest = async () => {
    const response = await fetch(`${SERVICE_URL}/empresas/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaEmpresaFormData)
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error('¡Error!', { description: `¡${result.error}!` });
      return false;
    }

    return true;
  }

  const alIniciarSesion = async (e) => {
    e.preventDefault();
    if (revisarValidezEmpresa()) {
      const infoEmpresa = await iniciarSesionRequest();
      if (infoEmpresa) {
        toast.success('¡Exito!', { description: '¡Ha iniciado sesion correctamente!' });
        setEmpresa(infoEmpresa);
        router.push('/Empresas/AdministrarMarca');
      }
    }
  }

  const revisarValidezEmpresa = () => {
    if (empresaFormData.nombreMarca === '') {
      toast.error('¡Error!', { description: '¡El campo nombre de marca no puede estar vacío!' });
      return false;
    }
    else if (empresaFormData.passwordMarca === '') {
      toast.error('¡Error!', { description: '¡El campo contraseña no puede estar vacío!' });
      return false;
    }
    return true;
  }

  const iniciarSesionRequest = async () => {
    const response = await fetch(`${SERVICE_URL}/iniciarSesion/empresa/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empresaFormData)
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error('¡Error!', { description: `¡${result.error}!` });
      return null;
    }

    return result.empresa;
  }

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
        <section className='bg-[#333] flex flex-wrap-reverse gap-5 py-7 px-5 justify-around'>
          <div className='flex flex-col w-[500px]'>
            <h5 className='text-4xl text-white'>
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
                    placeholder='Nombre de la Marca'
                    className='py-2 px-3 w-full rounded text-black'
                    onChange={(e) => setNuevaEmpresaFormData({ ...nuevaEmpresaFormData, nombreMarca: e.target.value })}
                    name='nombreMarca'
                  />
                </span>
                <span className='flex flex-col gap-2'>
                  <h5 className='text-white'>
                    Correo Institucional
                  </h5>
                  <input
                    placeholder='Correo'
                    className='py-2 px-3 w-full rounded'
                    onChange={(e) => setNuevaEmpresaFormData({ ...nuevaEmpresaFormData, correoMarca: e.target.value })}
                    name='correoEmpresa'
                  />
                </span>
                <span className='flex flex-col gap-2'>
                  <h5 className='text-white'>
                    Contraseña
                  </h5>
                  <input
                    placeholder='Contraseña'
                    className='py-2 px-3 w-full rounded'
                    onChange={(e) => setNuevaEmpresaFormData({ ...nuevaEmpresaFormData, passwordMarca: e.target.value })}
                    name='passwordEmpresa'
                  />
                </span>
                <button
                  className='bg-green-400 rounded p-1 text-white hover:bg-green-500'
                  onClick={alRegistrarEmpresa}
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
          <div className='min-w-[400px] max-w-[50vw] shadow'>
            <Image
              src={'/images/RopaDeportivaEmpresas.webp'}
              width={1500}
              height={1500}
              className='h-[70vh]'
              alt=''
              priority={true}
            />
          </div>
        </section>
        <section className='flex flex-wrap gap-5 py-7 px-5 justify-around'>
          <div className='min-w-[400px] max-w-[50vw] shadow'>
            <Image
              src={'/images/EquipamientoDeportivoEmpresas.webp'}
              width={1500}
              height={1500}
              className='h-[70vh]'
              alt=''
              priority={true}
            />
          </div>
          <div className='flex flex-col w-[500px]'>
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
                    placeholder='Nombre de la Marca'
                    className='py-2 px-3 w-full rounded bg-[#333] text-white'
                    onChange={(e) => setEmpresaFormData({ ...empresaFormData, nombreMarca: e.target.value })}
                    name='nombreMarca'
                    autoComplete='username'
                  />
                </span>
                <span className='flex flex-col gap-2'>
                  <h5>
                    Contraseña
                  </h5>
                  <input
                    placeholder='Contraseña'
                    className='py-2 px-3 w-full rounded bg-[#333] text-white'
                    onChange={(e) => setEmpresaFormData({ ...empresaFormData, passwordMarca: e.target.value })}
                    type='password'
                    name='passwordMarca'
                    autoComplete='new-password'
                  />
                </span>
                <button
                  className='bg-green-400 rounded p-1 text-white hover:bg-green-500'
                  onClick={alIniciarSesion}
                >
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