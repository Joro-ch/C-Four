import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useIsBrowser from '@/app/hooks/useIsBrowser';
import Image from 'next/image';
import { SERVICE_URL } from '@/app/constants/global';
import { TIPOS_PRODUCTOS } from '@/app/constants/productos';
import { toast } from 'sonner';

const SELECT_DEFAULT_VALUE = 'Seleccionar Tipo';

function EditProductModal({ 
    showModal, 
    setShowModal, 
    infoProducto,
    idProductoSeleccionado,
    restablecerListadoProductos
}) {
    const { isBrowser } = useIsBrowser();
    const [nuevoProductoFormData, setNuevoProductoFormData] = useState(infoProducto);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setNuevoProductoFormData({
                ...nuevoProductoFormData,
                productoImagen: reader.result // Aquí se almacena la imagen en base64
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const alEditarElProducto = async (e) => {
        e.preventDefault();
        if (revisarProductoNuevo() && await editarProuctoRequest()) {
            toast.success('¡Exito!', { description: '¡Producto editado correctamente!' });
            setShowModal(false);
            restablecerListadoProductos();
        }
    }

    const revisarProductoNuevo = () => {
        if (nuevoProductoFormData.nombreProducto === '') {
            toast.error('¡Error!', { description: '¡Por favor, ingrese el nombre del producto!' });
            return false;
        }
        else if (nuevoProductoFormData.tipoProducto === SELECT_DEFAULT_VALUE) {
            toast.error('¡Error!', { description: '¡Por favor, seleccione un tipo de producto!' });
            return false;
        }
        else if (nuevoProductoFormData.cantidadDisponible === 0) {
            toast.error('¡Error!', { description: '¡Por favor, ingrese una cantidad disponible!' });
            return false;
        }
        else if (nuevoProductoFormData.precioProducto === 0) {
            toast.error('¡Error!', { description: '¡Por favor, ingrese el precio del producto!' });
            return false;
        }
        else if (nuevoProductoFormData.productoImagen === '') {
            toast.error('¡Error!', { description: '¡Por favor, ingrese la imágen del producto!' });
            return false;
        }
        return true;
    }

    const editarProuctoRequest = async () => {
        const response = await fetch(`${SERVICE_URL}/productos/${infoProducto.idProducto}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProductoFormData)
        });

        const result = await response.json();
        if (!response.ok) {
            toast.error('¡Error!', { description: `¡${result.error}!` });
            return false;
        }
        return true;
    }

    const alEliminarProducto = async (e) => {
        e.preventDefault();
        if (await eliminarProductoRequest()) {
            toast.success('¡Exito!', { description: '¡Producto eliminado correctamente!' });
            setShowModal(false);
            restablecerListadoProductos();
        }
    }

    const eliminarProductoRequest = async () => {
        const response = await fetch(`${SERVICE_URL}/productos/${infoProducto.idProducto}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            toast.error('¡Error!', { description: `¡No se ha podido eliminar el producto!` });
            return false;
        }
        return true;
    }

    const MODAL = showModal && infoProducto.idProducto === idProductoSeleccionado ? (
        <div className='flex flex-col fixed top-0 left-1/2 transform -translate-x-1/2 min-w-[400px] w-[40vw] bg-[#333] shadow rounded-xl mt-5'>
            <div className='p-5 text-xl text-white flex justify-between'>
                <h5> Editar el Producto </h5>
                <button onClick={() => setShowModal(!showModal)}>
                    X
                </button>
            </div>
            <form>
                <div className='overflow-auto bg-white p-5 flex flex-col gap-2 max-h-[70vh]'>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Nombre del Producto
                        </h5>
                        <input
                            placeholder='Nombre del Producto'
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                            onChange={(e) => setNuevoProductoFormData({
                                ...nuevoProductoFormData,
                                nombreProducto: e.target.value
                            })}
                            defaultValue={nuevoProductoFormData.nombreProducto}
                            name='nombreProducto'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Tipo Producto
                        </h5>
                        <select
                            name="productos"
                            id={`${infoProducto.nombreProducto}Tipo`}
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                            onChange={(e) => setNuevoProductoFormData({
                                ...nuevoProductoFormData,
                                tipoProducto: e.target.value
                            })}
                            defaultValue={nuevoProductoFormData.tipoProducto}
                        >
                            <option> {SELECT_DEFAULT_VALUE} </option>
                            {Object.keys(TIPOS_PRODUCTOS).map((categoria) => (
                                <optgroup key={categoria} label={categoria}>
                                    {TIPOS_PRODUCTOS[categoria].map((producto) => (
                                        <option key={producto} value={producto}>
                                            {producto}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Cantidad
                        </h5>
                        <input
                            placeholder='Cantidad'
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                            onChange={(e) => setNuevoProductoFormData({
                                ...nuevoProductoFormData,
                                cantidadDisponible: e.target.value
                            })}
                            defaultValue={nuevoProductoFormData.cantidadDisponible}
                            name='cantidadDisponible'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Precio (en ₡)
                        </h5>
                        <input
                            placeholder='₡ Precio'
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                            onChange={(e) => setNuevoProductoFormData({
                                ...nuevoProductoFormData,
                                precioProducto: e.target.value
                            })}
                            defaultValue={nuevoProductoFormData.precioProducto}
                            name='precioProducto'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Imágen
                        </h5>
                        <input
                            type='file'
                            placeholder='₡ Precio'
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                            onChange={handleImageChange}
                            name='productoImagen'
                        />
                    </span>
                    {nuevoProductoFormData.productoImagen && (
                        <div className='flex flex-col gap-2'>
                            <h5>Previsualización de la imágen</h5>
                            <Image
                                src={nuevoProductoFormData.productoImagen}
                                alt="Producto"
                                className="rounded"
                                style={{ maxWidth: '100%', height: 'auto' }}
                                width={1500}
                                height={1500}
                                priority={true}
                            />
                        </div>
                    )}
                </div>
                <div className='p-5 text-white flex justify-end gap-5'>
                    <button
                        className='bg-white text-black py-1 px-2 shadow rounded hover:opacity-85'
                        onClick={() => setShowModal(!showModal)}
                    >
                        Cancelar
                    </button>
                    <button
                        className='bg-red-400 py-1 px-2 shadow rounded hover:opacity-85'
                        onClick={alEliminarProducto}
                    >
                        Eliminar
                    </button>
                    <button
                        className='bg-green-400 py-1 px-2 shadow rounded hover:opacity-85'
                        onClick={alEditarElProducto}
                    >
                        Editar
                    </button>
                </div>
            </form>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            MODAL,
            document.body
        )
    }

    return null;
}

export default EditProductModal;