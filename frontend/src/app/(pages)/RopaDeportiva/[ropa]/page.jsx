import Filters from '@/app/components/Filters';
import ProductCard from '@/app/components/ProductCard';
import React from 'react'

function Ropa() {
  return (
    <main className='grow flex'>
      <Filters />
      <div className='flex flex-wrap gap-4 justify-between p-5'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

    </main>
  )
}

export default Ropa;