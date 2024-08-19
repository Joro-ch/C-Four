'use client';
import { useState, useEffect } from "react";
import { userContext } from "./userContext";
import { SERVICE_URL } from "../constants/global";
import { toast } from "sonner";

function UserContextCompo({ children }) {
    const [usuario, setUsuario] = useState(() => {
        // Intenta obtener el usuario almacenado en localStorage al cargar el componente
        const usuarioGuardado = localStorage.getItem('usuario');
        return usuarioGuardado ? JSON.parse(usuarioGuardado) : {
            nombreUsuario: '',
            correoUsuario: '',
            passwordUsuario: '',
            listadoCarrito: [],
            listadoProductosComprados: [],
        };
    });

    useEffect(() => {
        // Guarda el usuario en localStorage cada vez que cambie
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario]);

    const agregarProductoListadoCarrito = (producto) => {
        setUsuario({ 
            ...usuario, 
            listadoCarrito: Array.isArray(usuario.listadoCarrito) 
                ? [...usuario.listadoCarrito, producto] 
                : [producto] 
        });
    };

    const eliminarProductoListadoCarrito = (idProducto) => {
        // Encontrar el índice del primer producto que coincida con el idProducto
        const index = usuario.listadoCarrito.findIndex((producto) => producto.idProducto === idProducto);
    
        // Si se encuentra el producto, eliminarlo
        if (index !== -1) {
            const nuevoListado = [...usuario.listadoCarrito];
            nuevoListado.splice(index, 1);
    
            setUsuario({
                ...usuario,
                listadoCarrito: nuevoListado
            });
        }
    }
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
                agregarProductoListadoCarrito,
                eliminarProductoListadoCarrito,
                comprarProducosDelCarrito,
            }}
        >
            {children}
        </userContext.Provider>
    )
}

export default UserContextCompo;
