import React from 'react'

function Filters() {
    return (
        <div className='w-[15vw] min-w-[170px] m-5 p-3 border rounded shadow'>
            <h5> Buscar </h5>
            <hr className='my-2'/>
            <input type='search' className='py-2 px-3 w-full border border-gray-700 rounded' />
            <h5 className='mt-2'> 
                Precio 
            </h5>
            <hr className='my-2'/>
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
            <hr className='my-2'/>
            <ul>
                <li className='flex gap-2'>
                    <input type='checkbox' />
                    Marca 1
                </li>
                <li className='flex gap-2'>
                    <input type='checkbox' />
                    Marca 2
                </li>
                <li className='flex gap-2'>
                    <input type='checkbox' />
                    Marca 3
                </li>
            </ul>
        </div>
    )
}

export default Filters