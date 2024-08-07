import TopicCard from '@/app/components/TopicCard';
import React from 'react'

const TOPICS = [{
  nombreTema: "Camisas",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/RopaDeportiva/Camisas",
}, {
  nombreTema: "Pantalones",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/RopaDeportiva/Pantalones",
},{
  nombreTema: "Sueters",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/RopaDeportiva/Sueters",
}, {
  nombreTema: "Zapatos",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/RopaDeportiva/Zapatos",
}, {
  nombreTema: "Medias",
  srcImagen: "/C-FourIcon.webp",
  hrefTema: "/RopaDeportiva/Medias",
}]

function RopaDeportivo() {
  return (
    <main className='grow flex flex-wrap gap-5 justify-around my-5'>
      {TOPICS.map((tema, index) => 
        <TopicCard nombreTema={tema.nombreTema} srcImagen={tema.srcImagen} hrefTema={tema.hrefTema} key={index} />
      )}
    </main>
  )
}

export default RopaDeportivo;