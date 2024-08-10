'use client';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react'
import EditProductModal from '../EditProductModal';

const PRODUCTOS = [{
    nombreProducto: 'Producto',
    precioProducto: 7000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}, {
    nombreProducto: 'Producto',
    precioProducto: 7000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}, {
    nombreProducto: 'Producto',
    precioProducto: 8000,
    marcaProducto: 'Marca',
    srcImagen: '/C-FourIcon.webp',
    cantidadDisponible: 15,
}]

function ProductsList() {
    const [showEditProductModal, setShowEditProductModal] = useState(false);

    return (
        <table className='w-full'>
            <thead>
                <tr className='border-b'>
                    <th className='p-2'>
                        Imagen 
                    </th>
                    <th className='p-2'> 
                        Nombre Producto 
                    </th>
                    <th className='p-2'> 
                        Cantidad Disponible 
                    </th>
                    <th className='p-2'> 
                        Precio Actual 
                    </th>
                    <th className='p-2'> 
                        Acciones 
                    </th>
                </tr>
            </thead>
            <tbody>
                {PRODUCTOS.map((producto, index) =>
                    <tr key={index}>
                        <td className='p-2'> 
                            <Image 
                                src={producto.srcImagen}
                                width={1500}
                                height={1500}
                                className='w-[30px] h-[30px] rounded-full mx-auto'
                            />
                        </td>
                        <td className='p-2 text-center'> 
                            {producto.nombreProducto} 
                        </td>
                        <td className='p-2 text-center'> 
                            {producto.cantidadDisponible} 
                        </td>
                        <td className='p-2 text-center'> 
                            ₡{producto.precioProducto} 
                        </td>
                        <td className='p-2 text-center'>
                            <button onClick={() => setShowEditProductModal(true)}> 
                                <FontAwesomeIcon icon={faTools} className='w-[20px]'/>
                            </button>
                            <EditProductModal showModal={showEditProductModal} setShowModal={setShowEditProductModal}/>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default ProductsList;