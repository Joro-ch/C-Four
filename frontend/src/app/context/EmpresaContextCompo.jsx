'use client';
import { useState, useEffect } from "react";
import { empresaContext } from "./empresaContext";

function EmpresaContextCompo({ children }) {
    const [empresa, setEmpresa] = useState({
        nombreMarca: '',
        correoMarca: '',
        passwordMarca: '',
    });

    useEffect(() => {
        const empresaGuardada = localStorage.getItem('empresa');
        if (empresaGuardada) {
            setEmpresa(JSON.parse(empresaGuardada));
        }
    }, []);

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