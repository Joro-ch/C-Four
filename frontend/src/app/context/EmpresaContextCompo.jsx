'use client';
import { useState, useEffect } from "react";
import { empresaContext } from "./empresaContext";

function EmpresaContextCompo({ children }) {
    const [empresa, setEmpresa] = useState(() => {
        // Intenta obtener la empresa almacenado en localStorage al cargar el componente
        const empresaGuardada = localStorage.getItem('empresa');
        return empresaGuardada ? JSON.parse(empresaGuardada) : {
            nombreMarca: '',
            correoMarca: '',
            passwordMarca: '',
        };
    });

    useEffect(() => {
        // Guarda la empresa en localStorage cada vez que cambie
        localStorage.setItem('empresa', JSON.stringify(empresa));
    }, [empresa]);

    return (
        <empresaContext.Provider
            value={{
                empresa,
                setEmpresa,
            }}
        >
            {children}
        </empresaContext.Provider>
    )
}

export default EmpresaContextCompo;