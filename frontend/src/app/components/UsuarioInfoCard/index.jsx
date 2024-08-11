'use client';
import { userContext } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function UsuarioInfoCard() {
    const router = useRouter();
    const { usuario, setUsuario } = useContext(userContext);

    const onLogOut = () => {
        setUsuario({
            nombreUsuario: '',
            correoUsuario: '',
            passwordUsuario: '',
        })
        router.push('/');
    }

    return (
        <div className='w-[25vw] min-w-[250px] shadow flex flex-col p-5'>
            <h5 className='text-6xl bg-[#333] rounded-full text-center px-8 py-5 text-white shadow self-center'>
                {usuario.nombreUsuario[0]}
            </h5>
            <hr className='my-2' />
            <div className='flex flex-col gap-2'>
                <span className='flex flex-col gap-2'>
                    <h5> Nombre de Usuario </h5>
                    <input
                        className='bg-[#333] px-5 py-2 text-white'
                        value={usuario.nombreUsuario}
                        placeholder='Nombre de Usuario'
                        disabled
                    />
                </span>
                <span className='flex flex-col gap-2'>
                    <h5> Correo </h5>
                    <input
                        className='bg-[#333] px-5 py-2 text-white mb-5'
                        value={usuario.correoUsuario}
                        placeholder='Correo'
                        type='email'
                        disabled
                    />
                </span>
                <h5> Cambio de Contraseña </h5>
                <hr className='my-1' />
                <span className='flex flex-col gap-2'>
                    <h5> Constraseña Actual </h5>
                    <input
                        className='bg-[#333] px-5 py-2 text-white'
                        placeholder='Constraseña Actual'
                        type='password'
                    />
                </span>
                <span className='flex flex-col gap-2'>
                    <h5> Constraseña Nueva </h5>
                    <input
                        className='bg-[#333] px-5 py-2 text-white'
                        placeholder='Constraseña Nueva'
                        type='password'
                    />
                </span>
                <button className='bg-green-400 rounded text-white py-2 hover:bg-green-500'>
                    Cambiar Contraseña
                </button>
                <hr className='my-1' />
                <button
                    className='bg-red-400 rounded text-white py-2 hover:bg-red-500'
                    onClick={onLogOut}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}

export default UsuarioInfoCard;