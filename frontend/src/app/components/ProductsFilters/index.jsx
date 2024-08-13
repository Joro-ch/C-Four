'use client';
import React, { useEffect, useState } from 'react';

function ProductsFilters({ listadoProductos, setListadoProuctos }) {
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
            setListadoProuctos(listadoProductos.filter(
                producto => producto.marcaProducto === e.target.value
            ));
        }
    }

    return (
        <div className='w-[13vw] min-w-[170px] m-5 p-3 border rounded shadow'>
            <h5> Buscar </h5>
            <hr className='my-2' />
            <input
                type='search'
                className='py-2 px-3 w-full border border-[#333] rounded'
                placeholder='Buscar'
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
            <ul>
                {listadoDeMarcasUnicas.map((marca, index) =>
                    <li className='flex gap-2' key={index}>
                        <input type='checkbox' value={marca} onChange={onCheckMarca} />
                        {marca}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default ProductsFilters