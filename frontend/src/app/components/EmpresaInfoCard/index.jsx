'use client';
import { SERVICE_URL } from '@/app/constants/global';
import { empresaContext } from '@/app/context/empresaContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from 'sonner';

function EmpresaInfoCard() {
    const router = useRouter();
    const { empresa, setEmpresa } = useContext(empresaContext);
    const [passwordFormData, setPasswordFormData] = useState({
        nombreMarca: empresa.nombreMarca,
        passwordActual: '',
        passwordNueva: '',
    });

    const onLogOut = () => {
        setEmpresa({
            nombreMarca: '',
            correoMarca: '',
            passwordMarca: '',
        })
        router.push('/');
    }

    const alCambiarPassword = async () => {
        if (revisarPasswordsData() && await cambiarPasswordRequest()) {
            toast.success('¡Exito!', { description: '¡Contraseña cambiada correctamente!' });
            setPasswordFormData({
                nombreMarca: empresa.nombreMarca,
                passwordActual: '',
                passwordNueva: '',
            });
        }
    }

    const revisarPasswordsData = () => {
        if (passwordFormData.passwordActual === '') {
            toast.error('¡Error!', { description: '¡Por favor, ingrese la contraseña actual!' });
            return false;
        }
        else if (passwordFormData.passwordNueva === '') {
            toast.error('¡Error!', { description: '¡Por favor, ingrese la contraseña nueva!' });
            return false;
        }
        return true;
    }

    const cambiarPasswordRequest = async () => {
        const response = await fetch(`${SERVICE_URL}/cambiarPassword/empresa/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordFormData)
        });

        const result = await response.json();
        if (!response.ok) {
            toast.error('¡Error!', { description: `¡${result.error}!` });
            return false;
        }
        return true;
    }

    return (
        <div className='w-[25vw] min-w-[250px] shadow flex flex-col p-5'>
            <h5 className='text-6xl bg-[#333] rounded-full text-center px-8 py-5 text-white shadow self-center'>
                {empresa.nombreMarca[0]}
            </h5>
            <hr className='my-2' />
            <div className='flex flex-col gap-2'>
                <span className='flex flex-col gap-2'>
                    <h5> Nombre de la Marca </h5>
                    <input
                        className='bg-[#333] px-5 py-2 text-white'
                        value={empresa.nombreMarca}
                        placeholder='Nombre de Usuario'
                        name='nombreUsuario'
                        disabled
                    />
                </span>
                <span className='flex flex-col gap-2'>
                    <h5> Correo </h5>
                    <input
                        className='bg-[#333] px-5 py-2 text-white mb-5'
                        value={empresa.correoMarca}
                        placeholder='Correo'
                        type='email'
                        name='correoUsuario'
                        disabled
                    />
                </span>
                <form className='flex flex-col gap-2'>
                    <h5> Cambio de Contraseña </h5>
                    <hr className='my-1' />
                    <span className='flex flex-col gap-2'>
                        <h5> Constraseña Actual </h5>
                        <input
                            className='bg-[#333] px-5 py-2 text-white'
                            placeholder='Constraseña Actual'
                            type='password'
                            onChange={(e) => setPasswordFormData({
                                ...passwordFormData,
                                passwordActual: e.target.value
                            })}
                            value={passwordFormData.passwordActual}
                            name='passwordActual'
                            autoComplete='current-password'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5> Constraseña Nueva </h5>
                        <input
                            className='bg-[#333] px-5 py-2 text-white'
                            placeholder='Constraseña Nueva'
                            type='password'
                            onChange={(e) => setPasswordFormData({
                                ...passwordFormData,
                                passwordNueva: e.target.value
                            })}
                            value={passwordFormData.passwordNueva}
                            name='passwordNueva'
                            autoComplete='newPassword'
                        />
                    </span>
                    <button
                        className='bg-green-400 rounded text-white py-2 hover:bg-green-500'
                        onClick={alCambiarPassword}
                    >
                        Cambiar Contraseña
                    </button>
                </form>
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

export default EmpresaInfoCard;