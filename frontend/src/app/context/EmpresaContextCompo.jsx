'use client';
import { useState, useEffect } from "react";
import { empresaContext } from "./empresaContext";

function EmpresaContextCompo({ children }) {
    const [empresa, setEmpresa] = useState({
        nombreMarca: '',
        correoMarca: '',
        passwordMarca: '',
    });
    const [cargado, setCargado] = useState(false); // Nueva bandera para saber si los datos han sido cargados

    useEffect(() => {
        const empresaGuardada = localStorage.getItem('empresa');
        if (empresaGuardada) {
            setEmpresa(JSON.parse(empresaGuardada));
        }
        setCargado(true); // Indicamos que los datos han sido cargados
    }, []);

    useEffect(() => {
        if (cargado) { // Solo guarda si ya se ha cargado el usuario desde localStorage
            localStorage.setItem('empresa', JSON.stringify(empresa));
        }
    }, [empresa, cargado]);

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