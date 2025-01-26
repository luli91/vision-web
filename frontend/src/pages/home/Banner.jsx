import React from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImg from "../../assets/bannerSeapicks.png";

const Banner = () => {

  const navigate = useNavigate();

    const goToProductsPage = () => {
        navigate('/productos');
    };

  return (
    <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12  px-4 py-6'>
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="banner" />
        </div>
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>¡Todo lo que necesitas, en un solo lugar!</h1>
            <p className='mb-10'>
            En SeaPicks, nos dedicamos a ofrecerte una amplia variedad de productos de alta calidad para cada aspecto de tu vida. Desde artículos de bazar y decoración únicos, hasta juguetes y lo último en tecnología, tenemos algo especial para todos. Descubre nuestra colección y encuentra aquello que hará tu día a día más especial y divertido. ¡Explora ahora y encuentra todo lo que necesitas con estilo y comodidad!</p>
            <div className='flex justify-center'>
                    <button
                        className='btn-primary bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300'
                        onClick={goToProductsPage}
                    >
                        Ir a la tienda
                    </button>
                </div>
        </div>

      
    </div>
  )
}

export default Banner
