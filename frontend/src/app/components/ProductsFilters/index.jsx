'use client';
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

function ProductsFilters({ listadoProductos, listadoMostrado, setListadoMostrado }) {
    const [listadoDeMarcasUnicas, setListadoDeMarcasUnicas] = useState([]);

    useEffect(() => {
        if (Array.isArray(listadoProductos)) {
            setListadoDeMarcasUnicas([
                ...new Set(listadoProductos.map(producto => producto.marcaProducto))
            ]);
        }
    }, [listadoProductos]);

    const onCheckMarca = (e) => {
        if (e.target.checked) {
            setListadoMostrado(listadoProductos.filter(
                producto => producto.marcaProducto === e.target.value
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
            />
            <h5 className='mt-2'>
                Precio
            </h5>
            <hr className='my-2' />
            <ul>
                <li className='flex gap-2'>
                    <input type='checkbox' />
                    {"< ₡3000"}
                </li>
                <li className='flex gap-2'>
                    <input type='checkbox' />
                    {"₡3000 < ₡7000"}
                </li>
                <li className='flex gap-2'>
                    <input type='checkbox' />
                    {"> ₡7000"}
                </li>
            </ul>
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