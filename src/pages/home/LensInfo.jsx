import React from 'react'
import bifocal from '../../assets/info/bifocal.png'
import monofocal from '../../assets/info/monofocal.jpg'
import monocromatico from '../../assets/info/monocromatico.png'
import multifocal from '../../assets/info/multifocal.png'
import progresivos from '../../assets/info/progresivos.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom'

const lensInfo = [
    {
        "id": 1,
        "title": "Lentes Bifocales",
        "description": "Los lentes bifocales están diseñados para personas que necesitan corrección tanto para la visión de cerca como de lejos. Se dividen en dos partes: la parte superior para visión lejana y la parte inferior para visión cercana.",
        "image": bifocal
    },
    {
        "id": 2,
        "title": "Lentes Monofocales",
        "description": "Los lentes monofocales tienen una única graduación en toda la superficie de la lente y se utilizan para corregir la miopía, hipermetropía o astigmatismo, proporcionando una visión clara a una distancia específica.",
        "image": monofocal
    },
    {
        "id": 3,
        "title": "Lentes Fotocromáticos",
        "description": "Los lentes fotocromáticos se oscurecen automáticamente al exponerse a la luz solar y se aclaran en interiores, proporcionando comodidad y protección contra los rayos UV.",
        "image": monocromatico
    },
    {
        "id": 4,
        "title": "Lentes Multifocales",
        "description": "Los lentes multifocales, también conocidos como progresivos, permiten ver de manera nítida a diferentes distancias (cerca, media y lejos) sin líneas divisorias visibles, lo que los hace ideales para la presbicia.",
        "image": multifocal
    },
    {
        "id": 5,
        "title": "Lentes Ocupacionales premium",
        "description": "Los lentes ocupacionales están diseñados para personas que trabajan frente a pantallas o realizan tareas que requieren enfoque en distancias intermedias y cercanas, proporcionando una visión cómoda y ergonómica.",
        "image": progresivos
    }
];

const LensInfo = () => {
  return (
    <div className='p-16'>
      <h2 className='text-3xl font-semibold mb-6'>Tipos de Lentes y sus Beneficios</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
            clickable: true,
          }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            lensInfo.map((item, index) =>(
            <SwiperSlide key={index}>
                <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                    <div className='flex-1 sm:w-[70%] py-4'>
                        <Link to="/">
                        <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item.title}</h3>
                        </Link>
                        <div className='w-10 h-[4px] bg-primary mb-5'></div>
                        <p className='text-sm text-gray-600'>{item.description}</p>
                    </div>
                    <div className='flex-shrink-0 sm:w-[30%] h-[200px]'> 
                        <img src={item.image} alt="" className='w-full object-cover' />
                    </div>
                </div>

            </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}

export default LensInfo
