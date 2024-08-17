'use client';
import React, { useState } from 'react';
import AddProductModal from '../AddProductModal';

function ToolBar({ agregarProductoAlListado }) {
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
                agregarProductoAlListado={agregarProductoAlListado}
            />
            <input
                type='search'
                placeholder='Buscar Producto'
                className='shadow w-full px-3 py-1 rounded'
            />
            <button className='bg-[#333] text-white py-1 px-2 rounded hover:opacity-85'>
                Buscar
            </button>
        </div>
    )
}

export default ToolBar