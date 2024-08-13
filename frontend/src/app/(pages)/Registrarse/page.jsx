'use client';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { SERVICE_URL } from '@/app/constants/global';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { userContext } from '@/app/context/userContext';

function Registrase() {
    const router = useRouter();
    const { setUsuario } = useContext(userContext);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombreUsuario: '',
        correoUsuario: '',
        passwordUsuario: '',
    });

    const onSingUp = async (e) => {
        e.preventDefault();
        if (checkValidUser() && await singUpRequest())
            setUsuario(nuevoUsuario);
            router.push('/');
    }

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const checkValidUser = () => {
        if (nuevoUsuario.nombreUsuario === '') {
            toast.error('¡Error!', { description: '¡El campo nombre de usuario no puede estar vacío!' });
            return false;
        }
        else if (nuevoUsuario.correoUsuario === '') {
            toast.error('¡Error!', { description: '¡El campo correo no puede estar vacío!' });
            return false;
        }
        else if (!isValidEmail(nuevoUsuario.correoUsuario)) {
            toast.error('¡Error!', { description: '¡El correo ingresado no es válido!' });
            return false;
        }
        else if (nuevoUsuario.passwordUsuario === '') {
            toast.error('¡Error!', { description: '¡El campo contraseña no puede estar vacío!' });
            return false;
        }
        return true;
    }

    const singUpRequest = async () => {
        const response = await fetch(`${SERVICE_URL}/usuarios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario)
        });

        if (!response.ok) {
            const result = await response.json();
            if (result.nombreUsuario) {
                toast.error('¡Error!', { description: `¡${result.nombreUsuario}!` });
            }
            else if (result.correoUsuario) {
                toast.error('¡Error!', { description: `¡${result.correoUsuario}!` });
            }
            return false;
        }
        return true;
    }

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
                            id='nombreUsuario'
                            onChange={(e) => setNuevoUsuario({
                                ...nuevoUsuario,
                                nombreUsuario: e.target.value
                            })}
                            placeholder='Nombre de Usuario'
                            className='py-2 px-3 w-full rounded'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5 className='text-white'>
                            Correo
                        </h5>
                        <input
                            id='correoUsuario'
                            type='email'
                            onChange={(e) => setNuevoUsuario({
                                ...nuevoUsuario,
                                correoUsuario: e.target.value
                            })}
                            placeholder='Correo'
                            className='py-2 px-3 w-full rounded'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5 className='text-white'>
                            Contraseña
                        </h5>
                        <input
                            id='passwordUsuario'
                            type='password'
                            onChange={(e) => setNuevoUsuario({
                                ...nuevoUsuario,
                                passwordUsuario: e.target.value
                            })}
                            placeholder='Contraseña'
                            className='py-2 px-3 w-full rounded'
                        />
                    </span>
                    <button
                        onClick={onSingUp}
                        type='submit'
                        className='bg-green-400 rounded p-1 text-white hover:bg-green-500'>
                        Registrarse
                    </button>
                    <Link href={'/IniciarSesion'} className='text-center text-gray-400 hover:text-white'>
                        ¿Tiene cuenta? <br />
                        Iniciar Sesión
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default Registrase;
