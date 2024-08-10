import ProductsList from '@/app/components/ProductsList'
import ToolBar from '@/app/components/ToolBar'
import React from 'react'

function AdministrarMarca() {
  return (
    <main className='grow p-5 flex flex-col gap-5'>
        <ToolBar />
        <ProductsList />
    </main>
  )
}

export default AdministrarMarca