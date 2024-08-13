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
        };
    });

    useEffect(() => {
        // Guarda el usuario en localStorage cada vez que cambie
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario]);

    useEffect(() => {
        if (Array.isArray(usuario.listadoCarrito)) console.log(usuario.listadoCarrito)
    }, [usuario.listadoCarrito]);

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

    return (
        <userContext.Provider
            value={{
                usuario,
                setUsuario,
                agregarProductoListadoCarrito,
                eliminarProductoListadoCarrito,
            }}
        >
            {children}
        </userContext.Provider>
    )
}

export default UserContextCompo;
