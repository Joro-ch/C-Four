import useIsBrowser from '@/app/hooks/useIsBrowser';
import React from 'react';
import ReactDOM from 'react-dom';

function MessageModal({ children, showModal, setShowModal, tituloModal, accionAceptar }) {
    const { isBrowser } = useIsBrowser();
    const onClose = () => setShowModal(!showModal);

    const MODAL = showModal ? (
        <div className='flex flex-col fixed top-0 left-1/2 transform -translate-x-1/2 min-w-[400px] w-[40vw] bg-[#333] shadow rounded-xl mt-5'>
            <div className='p-5 text-xl text-white flex justify-between'>
                <h5> {tituloModal} </h5>
                <button onClick={onClose}>
                    X
                </button>
            </div>
                {children}
            <div className='p-5 text-white flex justify-end gap-5'>
                <button
                    className='bg-white text-black py-1 px-2 shadow rounded hover:opacity-85'
                    onClick={onClose}
                >
                    Cancelar
                </button>
                <button
                    className='bg-green-400 py-1 px-2 shadow rounded hover:opacity-85'
                    onClick={accionAceptar}
                >
                    Aceptar
                </button>
            </div>
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

export default MessageModal;