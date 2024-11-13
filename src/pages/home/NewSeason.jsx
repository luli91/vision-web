import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductsCard from '../products/ProductsCard';

const NewSeason = () => {
  const [productos, setProductos] = useState([]);

    useEffect (() => {
        fetch("productos.json")
        .then(res => res.json())
        .then((data) => setProductos(data))
    }, [])

  return (
    <div className='py-16 px-4 bg-[#FBFBFB]'>
      <h2 className='text-3xl font-semibold mb-6'> Nueva Temporada</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        
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
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

        {
            productos.length > 0 && productos.slice(8, 18).map((productos, index)  => (
                <SwiperSlide key={index}>
                    <ProductsCard  producto={productos}/>
                </SwiperSlide>
                
            ))
        }

        
      </Swiper>
    </div>
  )
}

export default NewSeason
