'use client';
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

function ProductsFilters({ listadoProductos, setListadoMostrado }) {
    const [listadoDeMarcasUnicas, setListadoDeMarcasUnicas] = useState([]);
    const [umbralesPrecios, setUmbralesPrecios] = useState([]);
    const [nombreProductoBuscado, setNombreProductoBuscado] = useState('');

    useEffect(() => {
        if (Array.isArray(listadoProductos)) {
            setListadoDeMarcasUnicas([
                ...new Set(listadoProductos.map(producto => producto.nombreMarca))
            ]);
            const listadoPrecios = listadoProductos.map(
                producto => producto.precioProducto
            );
            const u1 = listadoPrecios[Math.floor(listadoPrecios.length * 0.25)];
            const u2 = listadoPrecios[Math.floor(listadoPrecios.length * 0.50)];
            const u3 = listadoPrecios[Math.floor(listadoPrecios.length * 0.75)];
            setUmbralesPrecios([u1, u2, u3]);
        }
    }, [listadoProductos]);

    const onCheckMarca = (e) => {
        if (e.target.checked) {
            setListadoMostrado(listadoProductos.filter(
                producto => producto.nombreMarca === e.target.value
            ));
        }
    }

    const onCheckPrecio = (e) => {
        if (e.target.checked) {
            setListadoMostrado(listadoProductos.filter(
                producto => producto.precioProducto <= e.target.value
            ));
        }
    }

    const buscarMarca = () => {
        if (Array.isArray(listadoProductos)) {
            setListadoMostrado(listadoProductos.filter(
                producto => producto.nombreProducto === nombreProductoBuscado
            ));
        }
    }

    return (
        <div className='w-[13vw] min-w-[200px] m-5 p-3 border rounded shadow'>
            <h5> Buscar </h5>
            <hr className='my-2' />
            <input
                type='search'
                className='py-2 px-3 w-full border border-[#333] rounded'
                placeholder='Nombre Producto'
                name='nombreProducto'
                onChange={(e) => setNombreProductoBuscado(e.target.value)}
            />
            <button
                className='shadow w-full py-1 bg-[#333] text-white rounded mt-1 hover:opacity-85'
                onClick={buscarMarca}
            >
                Buscar
            </button>
            <h5 className='mt-2'>
                Precio
            </h5>
            <hr className='my-2' />
            <form>
                {umbralesPrecios.map((umbral, index) =>
                    <div className='flex gap-2' key={index}>
                        <input
                            type='radio'
                            value={umbral}
                            id={umbral + index}
                            name='precioProducto'
                            onChange={onCheckPrecio}
                        />
                        {"< ₡" + umbral}
                    </div>
                )}
            </form>
            <h5 className='mt-2'>
                Marca
            </h5>
            <hr className='my-2' />
            <form>
                {listadoDeMarcasUnicas.map((marca, index) =>
                    <div className='flex gap-2' key={index}>
                        <input type='radio' value={marca} id={marca} name='marcaProducto' onChange={onCheckMarca} />
                        {marca}
                    </div>
                )}
            </form>
            <hr className='my-2' />
            <button
                className='bg-green-400 p-1 rounded text-white w-full hover:bg-green-500'
                onClick={() => setListadoMostrado(listadoProductos)}
            >
                <FontAwesomeIcon icon={faArrowRotateBack} />
            </button>
        </div>
    )
}

export default ProductsFilters;