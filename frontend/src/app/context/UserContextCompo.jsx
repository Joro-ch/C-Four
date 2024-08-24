'use client';
import { useState, useEffect } from "react";
import { userContext } from "./userContext";

function UserContextCompo({ children }) {
    const [usuario, setUsuario] = useState({
        nombreUsuario: '',
        correoUsuario: '',
        passwordUsuario: '',
    });
    const [cargado, setCargado] = useState(false); 

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setCargado(true); 
    }, []);

    useEffect(() => {
        if (cargado) { 
            localStorage.setItem('usuario', JSON.stringify(usuario));
        }
    }, [usuario, cargado]);

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
