"use client";
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';

function ProductModal({ showModal, setShowModal }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true)
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.className += ' overflow-hidden';
        }
        return () => {
            document.body.className = 'h-screen';
        }
    }, [showModal]);

    const onClickOutSide = () => setShowModal(!showModal);

    const MODAL = showModal ? (
        <>
            <button
                className='fixed top-0 left-0 bg-[#333] w-full h-full opacity-15'
                onClick={onClickOutSide}
            />
            <div className='flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[90vh] w-[60vw] bg-[#333] shadow rounded'>
                <div className='h-[80%]'>
                    <Image
                        src={'/C-FourIcon.webp'}
                        width={1500}
                        height={1500}
                        className='h-full rounded-t shadow'
                    />
                    <button
                        className='fixed top-0 right-0 my-4 mx-5 text-xl shadow rounded-full w-[30px] h-[30px]'
                        onClick={onClickOutSide}
                    >
                        X
                    </button>
                </div>
                <div className='flex justify-between flex-wrap items-center text-white h-full px-10'>
                    <div>
                        <h5 className='text-3xl'>
                            ₡7000
                        </h5>
                        <h5 className='text-xl'>
                            Producto - Marca
                        </h5>
                    </div>
                    <div className='flex gap-5'>
                        <button className='bg-white text-xl rounded p-4 hover:opacity-85 text-[#333] '>
                            <FontAwesomeIcon icon={faStar} /> 
                        </button>
                        <button className='bg-green-400 text-xl rounded p-4 hover:opacity-85 w-[1/2]'>
                            <FontAwesomeIcon icon={faCartShopping} /> Comprar 
                        </button>
                    </div>
                </div>
            </div>
        </>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            MODAL,
            document.body
        )
    }

    return null;
}

export default ProductModal