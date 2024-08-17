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
        const nuevoListado = usuario.listadoCarrito.filter((producto) => producto.idProducto != idProducto);
        setUsuario({
            ...usuario,
            listadoCarrito: nuevoListado
        });
    }

    const comprarProducosDelCarrito = () => {
        setUsuario({ 
            ...usuario, 
            listadoProductosComprados: Array.isArray(usuario.listadoProductosComprados) 
                ? [...usuario.listadoProductosComprados, ...usuario.listadoCarrito]
                : [...usuario.listadoCarrito],
            listadoCarrito: []
        });
    };

    const eliminarProductoDelHistorial = (idProducto) => {
        const nuevoListado = usuario.listadoProductosComprados.filter((producto) => producto.idProducto != idProducto);
        setUsuario({
            ...usuario,
            listadoProductosComprados: nuevoListado
        });
    }

    return (
        <userContext.Provider
            value={{
                usuario,
                setUsuario,
                agregarProductoListadoCarrito,
                eliminarProductoListadoCarrito,
                comprarProducosDelCarrito,
                eliminarProductoDelHistorial
            }}
        >
            {children}
        </userContext.Provider>
    )
}

export default UserContextCompo;
