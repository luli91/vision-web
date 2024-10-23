import React from 'react'

import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="banner" />
        </div>
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>¡Calidad y estilo al mejor valor!</h1>
            <p className='mb-10'>
        En Optica Nissis, estamos dedicados a ofrecerte soluciones ópticas que se adapten a tu estilo de vida. Disfruta de una amplia gama de lentes y gafas de sol, diseñadas para que veas el mundo con claridad y mucho estilo. Desde estilos modernos hasta clásicos, nuestra misión es que todos puedan disfrutar de una visión excepcional, sin importar la ocasión. ¡Descubre lo que tenemos para ti!</p>
            <button className='btn-primary'>Ir a la tienda</button>
        </div>

      
    </div>
  )
}

export default Banner
