import TopicCard from '@/app/components/TopicCard';
import React from 'react'

const TOPICS = [{
  nombreTema: "Camisetas",
  srcImagen: "/images/CamisetasDeportivas.webp",
  hrefTema: "/RopaDeportiva/Camisetas",
}, {
  nombreTema: "Suéteres",
  srcImagen: "/images/SuéteresDeportivos.webp",
  hrefTema: "/RopaDeportiva/Suéteres",
}, {
  nombreTema: "Pantalones",
  srcImagen: "/images/PantalonesDeportivos.webp",
  hrefTema: "/RopaDeportiva/Pantalones",
}, {
  nombreTema: "Pantalonetas",
  srcImagen: "/images/PantalonetasDeportivas.webp",
  hrefTema: "/RopaDeportiva/Pantalones",
}, {
  nombreTema: "Zapatos",
  srcImagen: "/images/ZapatosDeportivos.webp",
  hrefTema: "/RopaDeportiva/Zapatos",
}, {
  nombreTema: "Calcetines",
  srcImagen: "/images/CalcetinesDeportivos.webp",
  hrefTema: "/RopaDeportiva/Calcetines",
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