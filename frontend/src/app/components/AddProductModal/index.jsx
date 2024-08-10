import useIsBrowser from '@/app/hooks/useIsBrowser';
import React from 'react';
import ReactDOM from 'react-dom';

function AddProductModal({ showModal, setShowModal }) {
    const { isBrowser } = useIsBrowser();
    const onClose = () => setShowModal(!showModal);

    const MODAL = showModal ? (
        <div className='flex flex-col fixed top-0 left-1/2 transform -translate-x-1/2 min-w-[400px] w-[40vw] bg-[#333] shadow rounded-xl mt-5'>
            <div className='p-5 text-xl text-white flex justify-between'>
                <h5> Añadir un Producto </h5>
                <button onClick={onClose}>
                    X
                </button>
            </div>
            <form>
                <div className='bg-white p-5 flex flex-col gap-2'>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Nombre del Producto
                        </h5>
                        <input
                            placeholder='Nombre del Producto'
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Cantidad
                        </h5>
                        <input
                            placeholder='Cantidad'
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
                        />
                    </span>
                    <span className='flex flex-col gap-2'>
                        <h5>
                            Precio (en ₡)
                        </h5>
                        <input
                            placeholder='₡ Precio'
                            className='py-2 px-3 w-full rounded bg-[#333] text-white'
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
                        />
                    </span>
                </div>
                <div className='p-5 text-white flex justify-end gap-5'>
                    <button
                        className='bg-white text-black py-1 px-2 shadow rounded hover:opacity-85'
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className='bg-green-400 py-1 px-2 shadow rounded hover:opacity-85'
                        onClick={() => { }}
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