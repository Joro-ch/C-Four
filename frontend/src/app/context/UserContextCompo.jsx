'use client';
import { useState, useEffect } from "react";
import { userContext } from "./userContext";
import { SERVICE_URL } from "../constants/global";
import { toast } from "sonner";

function UserContextCompo({ children }) {
    const [usuario, setUsuario] = useState({
        nombreUsuario: '',
        correoUsuario: '',
        passwordUsuario: '',
        listadoCarrito: [],
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

    const comprarProducosDelCarrito = async () => {
        procesarCarrito();
        setUsuario({ 
            ...usuario,
            listadoCarrito: []
        });
    };

    const procesarCarrito = async () => {
        try {
            const resultados = await Promise.all(
                usuario.listadoCarrito.map(async (producto) => {
                    return agregarProductosAlHistorialRequest(producto);
                })
            );
    
            // Verifica si alguna de las peticiones falló
            const hayErrores = resultados.some(result => result === false);
    
            if (hayErrores) {
                toast.error('¡Error!', { description: '¡Algunas peticiones fallaron!' });
            } else {
                toast.success('¡Exito!', { 
                    description: '¡Todas las peticiones se realizaron correctamente!'
                });
            }
        } catch (error) {
            toast.error('¡Error!', { description: '¡Ocurrió un error inesperado!' });
        }
    };

    const agregarProductosAlHistorialRequest = async (producto) => {
        const response = await fetch(`${SERVICE_URL}/historialCompraUsuario/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nombreUsuario: usuario.nombreUsuario, 
                idProducto: producto.idProducto 
            }),
        });

        const result = await response.json();
        if (!response.ok) {
            toast.error('¡Error!', { description: `¡${result.error}!` });
            return false;
        }
        return true;
    }

    return (
        <userContext.Provider
            value={{
                usuario,
                setUsuario,
                comprarProducosDelCarrito,
            }}
        >
            {children}
        </userContext.Provider>
    )
}

export default UserContextCompo;
