'use client';
import React, { useState } from 'react';
import TopicCard from '@/app/components/TopicCard';
import { CATEGORIA_PRODUCTOS_DEPORTIVOS, CATEGORIAS_ROPA_DEPORTIVA } from '@/app/constants/productos';

function Categoria({ params }) {
  const [listadoCategorias, _] = useState(
    params.categoria === 'RopaDeportiva' ? CATEGORIAS_ROPA_DEPORTIVA : CATEGORIA_PRODUCTOS_DEPORTIVOS
  )

  return (
    <main className='grow flex flex-wrap gap-5 justify-around my-5'>
      {listadoCategorias.map((categoria, index) =>
        <TopicCard
          nombreCategoria={categoria.nombreCategoria}
          srcImagen={categoria.srcImagen}
          hrefTema={categoria.hrefTema}
          key={index}
        />
      )}
    </main>
  )
}

export default Categoria;