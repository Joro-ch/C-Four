'use client';
import Image from 'next/image';
import React, { useState } from 'react'
import EditProductModal from '../EditProductModal';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductsList({ listadoProductos, restablecerListadoProductos }) {
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState('');

    const alPresionarEditar = (idProductoSeleccionado) => {
        setShowEditProductModal(true);
        setIdProductoSeleccionado(idProductoSeleccionado);
    }

    return (
        <table className='w-full'>
            <thead>
                <tr className='border-b'>
                    <th className='p-2'>
                        Imagen
                    </th>
                    <th className='p-2'>
                        Nombre
                    </th>
                    <th className='p-2'>
                        Tipo
                    </th>
                    <th className='p-2'>
                        Cantidad
                    </th>
                    <th className='p-2'>
                        Precio
                    </th>
                    <th className='p-2'>
                        Editar
                    </th>
                </tr>
            </thead>
            <tbody>
                {listadoProductos.map((producto, index) =>
                    <tr key={index}>
                        <td className='p-2'>
                            <Image
                                src={producto.productoImagen}
                                width={1500}
                                height={1500}
                                className='w-[30px] h-[30px] rounded-full mx-auto'
                                alt=''
                                priority={true}
                            />
                        </td>
                        <td className='p-2 text-center'>
                            {producto.nombreProducto}
                        </td>
                        <td className='p-2 text-center'>
                            {producto.tipoProducto}
                        </td>
                        <td className='p-2 text-center'>
                            {producto.cantidadDisponible}
                        </td>
                        <td className='p-2 text-center'>
                            ₡{producto.precioProducto}
                        </td>
                        <td className='p-2 text-center'>
                            <button onClick={() => alPresionarEditar(producto.idProducto)}>
                                <FontAwesomeIcon icon={faTools} className='w-[20px]' />
                            </button>
                            <EditProductModal
                                showModal={showEditProductModal}
                                setShowModal={setShowEditProductModal}
                                infoProducto={producto}
                                idProductoSeleccionado={idProductoSeleccionado}
                                restablecerListadoProductos={restablecerListadoProductos}
                            />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default ProductsList;