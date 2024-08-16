import EmpresaInfoCard from '@/app/components/EmpresaInfoCard'
import ProductsList from '@/app/components/ProductsList'
import ToolBar from '@/app/components/ToolBar'
import React from 'react'

function AdministrarMarca() {
  return (
    <main className='grow p-5 flex gap-5'>
      <EmpresaInfoCard />
      <div className='flex flex-col gap-2 w-full'>
        <ToolBar />
        <ProductsList />
      </div>
    </main>
  )
}

export default AdministrarMarca