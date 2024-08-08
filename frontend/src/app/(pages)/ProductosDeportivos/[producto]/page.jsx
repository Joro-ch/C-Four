import Filters from '@/app/components/Filters';
import ProductCard from '@/app/components/ProductCard';
import React from 'react'

function Producto() {
  return (
    <main className='grow flex'>
      <Filters />
      <ProductCard />
    </main>
  )
}

export default Producto;