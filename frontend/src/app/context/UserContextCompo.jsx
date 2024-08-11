'use client';
import { useState, useEffect } from "react";
import { userContext } from "./userContext";

function UserContextCompo({ children }) {
    const [usuario, setUsuario] = useState(() => {
        // Intenta obtener el usuario almacenado en localStorage al cargar el componente
        const usuarioGuardado = localStorage.getItem('usuario');
        return usuarioGuardado ? JSON.parse(usuarioGuardado) : {
            nombreUsuario: '',
            correoUsuario: '',
            passwordUsuario: '',
        };
    });

    useEffect(() => {
        // Guarda el usuario en localStorage cada vez que cambie
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario]);

    return (
        <userContext.Provider
            value={{
                usuario,
                setUsuario,
            }}
        >
            {children}
        </userContext.Provider>
    )
}

export default UserContextCompo;
