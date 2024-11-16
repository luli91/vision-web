import React, { useEffect, useRef, useState } from 'react'
import ProductsCard from '../products/ProductsCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const categories = ["Elegí la categoria", "Sol", "Lectura", "Computadora", "Deportivos", "Niños", "Moda"]

const TopSellers = () => {
    const [productos, setProductos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState ("Elegí la categoria")

    useEffect (() => {
        fetch("productos.json")
        .then(res => res.json())
        .then((data) => setProductos(data))
    }, [])

    const filteredProductos = selectedCategory === "Elegí la categoria" 
    ? productos 
    : productos.filter(producto => producto.category.toLowerCase() === selectedCategory.trim().toLowerCase());
    console.log(filteredProductos);
    
  return (
    <div className='py-10 px-4'>
        <h2 className='text-3xl font-semibold mb-6'> Top Sellers</h2>
        {/* category filtering */}
        <div className='mb-8 flex items-center'>
            <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                {
                    categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>
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
            filteredProductos.length > 0 && filteredProductos.map((productos, index)  => (
                <SwiperSlide key={index}>
                    <ProductsCard  producto={productos}/>
                </SwiperSlide>
                
            ))
        }

        
      </Swiper>
        
    </div>
  )
}

export default TopSellers