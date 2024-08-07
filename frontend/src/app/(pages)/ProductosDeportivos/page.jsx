import TopicCard from '@/app/components/TopicCard';
import React from 'react';

const TOPICS = [{
  nombreTema: "Botellas",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/ProductosDeportivos/Botellas",
}, {
  nombreTema: "Suplementos",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/ProductosDeportivos/Suplementos",
},{
  nombreTema: "Complementos",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/ProductosDeportivos/Complementos",
}, {
  nombreTema: "Equipamiento",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/ProductosDeportivos/Equipamiento",
}]

function ProductosDeportivos() {
  return (
    <main className='grow flex flex-wrap gap-5 justify-around my-5'>
      {TOPICS.map((tema, index) => 
        <TopicCard nombreTema={tema.nombreTema} srcImagen={tema.srcImagen} hrefTema={tema.hrefTema} key={index} />
      )}
    </main>
  )
}

export default ProductosDeportivos;