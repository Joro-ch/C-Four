import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import useIsBrowser from '@/app/hooks/useIsBrowser';
import Image from 'next/image';
import { TIPOS_PRODUCTOS } from '@/app/constants/productos';
import { empresaContext } from '@/app/context/empresaContext';
import { toast } from 'sonner';
import { SERVICE_URL } from '@/app/constants/global';

const SELECT_DEFAULT_VALUE = 'Seleccionar Tipo';

function AddProductModal({ showModal, setShowModal }) {
    const { isBrowser } = useIsBrowser();
    const { empresa } = useContext(empresaContext);
    const [nuevoProductoFormData, setNuevoProductoFormData] = useState({
        nombreProducto: '',
        tipoProducto: SELECT_DEFAULT_VALUE,
        precioProducto: 0,
        cantidadDisponible: 0,
        nombreMarca: empresa.nombreMarca,
        productoImagen: '',
    });

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

    const alAgregarProducto = async (e) => {
        e.preventDefault();
        console.log(nuevoProductoFormData);
        if (revisarProductoNuevo() && await agregarProductoRequest()) {
            toast.success('¡Exito!', { description: '¡Producto añadido correctamente!' });
            setShowModal(false);
            setNuevoProductoFormData({ ...nuevoProductoFormData, productoImagen: '' })
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

    const agregarProductoRequest = async () => {
        const response = await fetch(`${SERVICE_URL}/productos/`, {
            method: 'POST',
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

    const MODAL = showModal ? (
        <div className='flex flex-col fixed top-0 left-1/2 transform -translate-x-1/2 min-w-[400px] w-[40vw] bg-[#333] shadow rounded-xl mt-5'>
            <div className='p-5 text-xl text-white flex justify-between'>
                <h5> Añadir un Producto </h5>
                <button onClick={() => setShowModal(!showModal)}>
                    X
                </button>
            </div>
            <form>
                <div className='bg-white p-5 flex flex-col gap-2 max-h-[70vh] overflow-auto'>
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
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Tipo Producto
                        </h5>
                        <select
                            name="productos"
                            id="productos"
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                            onChange={(e) => setNuevoProductoFormData({
                                ...nuevoProductoFormData,
                                tipoProducto: e.target.value
                            })}
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
                            type='number'
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
                            type='number'
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
                        className='bg-green-400 py-1 px-2 shadow rounded hover:opacity-85'
                        onClick={alAgregarProducto}
                    >
                        Añadir
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

export default AddProductModal