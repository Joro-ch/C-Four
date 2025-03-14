import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='grow'>
      <article>
        <section className='flex flex-col justify-center items-center gap-5 h-[70dvh]'>
          <h1 className='text-6xl'>
            C-Four
          </h1>
          <p> Tienda #1 en la venta de productos deportivos! </p>
        </section>
        <section className='bg-[#333] flex flex-wrap-reverse gap-5 py-7 px-5 text-white justify-around'>
          <div className='flex flex-col w-[500px]'>
            <h5 className='text-4xl'>
              Descubre tu Mejor Versión con C-Four
            </h5>
            <hr className='my-3' />
            <p>
              Eleva tu rendimiento con nuestra exclusiva línea de ropa deportiva diseñada
              para conquistar cada desafío. En C-Four, combinamos estilo, tecnología y comodidad
              para ofrecerte prendas que se mueven contigo. Ya sea que estés en el gimnasio,
              en la pista, o explorando nuevas rutas, nuestra colección te asegura máxima
              flexibilidad, transpirabilidad y un look que destaca. Transforma cada entrenamiento
              en una experiencia única con C-Four, donde el rendimiento se une con la moda.
            </p>
            <Link href={'/RopaDeportiva'} className='bg-white p-3 mt-3 text-center text-black rounded-xl hover:opacity-85'>
              Ir al Catalogo de Ropa Deportiva
            </Link>
          </div>
          <div className='min-w-[400px] max-w-[50vw] shadow'>
            <Image
              src={'/images/RopaDeportiva.webp'}
              width={1500}
              height={1500}
              className='h-[70vh] object-cover'
              alt=''
              priority={true}
            />
          </div>
        </section>
        <section className='flex flex-wrap gap-5 py-7 px-5 text-white justify-around'>
          <div className='min-w-[400px] max-w-[50vw] shadow'>
            <Image
              src={'/images/ProductosDeportivos.webp'}
              width={1500}
              height={1500}
              className='h-[70vh] object-cover'
              alt=''
              priority={true}
            />
          </div>
          <div className='flex flex-col w-[500px] text-black'>
            <h5 className='text-4xl'>
              Equípate para la Excelencia con C-Four
            </h5>
            <hr className='my-3' />
            <p>
              Prepárate para dominar cualquier deporte con los productos de alta calidad de C-Four.
              Desde el equipamiento más avanzado hasta los accesorios esenciales, nuestra selección
              está diseñada para mejorar tu rendimiento y llevarte al siguiente nivel. Ya sea que
              practiques deportes de equipo, fitness, o actividades al aire libre, encontrarás todo
              lo que necesitas para superar tus límites. Con C-Four, no solo te equipas,
              te transformas en el atleta que siempre quisiste ser.
            </p>
            <Link href={'/ProductosDeportivos'} className='bg-[#333] p-3 mt-3 text-center text-white rounded-xl hover:opacity-85'>
              Ir al Catalogo de Productos Deportivos
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
