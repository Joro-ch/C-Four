'use client';
import React, { useState } from 'react';
import AddProductModal from '../AddProductModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';

function ToolBar({ restablecerListadoProductos, buscarProducto }) {
    const [nombreProducto, setNombreProducto] = useState('');
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    return (
        <div className='flex items-center gap-5'>
            <button
                className='py-1 px-2 bg-green-400 rounded text-white hover:bg-green-500 text-nowrap'
                onClick={() => setShowAddProductModal(true)}
            >
                Añadir Producto
            </button>
            <AddProductModal
                showModal={showAddProductModal}
                setShowModal={setShowAddProductModal}
                restablecerListadoProductos={restablecerListadoProductos}
            />
            <input
                type='search'
                placeholder='Buscar Producto'
                className='shadow w-full px-3 py-1 rounded'
                onChange={(e) => setNombreProducto(e.target.value)}
            />
            <button
                className='bg-[#333] text-white py-1 px-2 rounded hover:opacity-85'
                onClick={() => buscarProducto(nombreProducto)}
            >
                Buscar
            </button>
            <button onClick={restablecerListadoProductos}>
                <FontAwesomeIcon
                    icon={faArrowLeftRotate}
                    className='hover:bg-[#333] hover:text-white rounded p-2 duration-300'
                />
            </button>
        </div>
    )
}

export default ToolBar