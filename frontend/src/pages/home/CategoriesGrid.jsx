import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';


import bazar from '../../assets/category/bazar.jpg';
import homeDeco from '../../assets/category/Home_y_deco.jpg';
import regaleria from '../../assets/category/regaleria.jpg';
import bellezaCuidado from '../../assets/category/Belleza_y_cuidado_personal.jpg';
import jugueteria from '../../assets/category/Jugueteria.jpg';
import tecnologia from '../../assets/category/Tecnologia.jpg';

const CategoriesGrid = () => {
    const { data: products = [] } = useFetchAllProductsQuery();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const uniqueCategories = [...new Set(products.map(product => product.category.trim().toLowerCase()))];
            const categoriesWithImages = uniqueCategories.map((category, index) => {
                let imageSrc;
                switch (category.toLowerCase()) {
                    case 'bazar':
                        imageSrc = bazar;
                        break;
                    case 'home y deco':
                        imageSrc = homeDeco;
                        break;
                    case 'regaleria':
                        imageSrc = regaleria;
                        break;
                    case 'belleza y cuidado personal':
                        imageSrc = bellezaCuidado;
                        break;
                    case 'jugueteria':
                        imageSrc = jugueteria;
                        break;
                    case 'tecnologia':
                        imageSrc = tecnologia;
                        break;
                    default:
                        imageSrc = '';
                }
                return {
                    id: index + 1,
                    name: category,
                    image: imageSrc,
                    path: `/productos/${category.toLowerCase().replace(/ /g, '_')}`
                };
            });
            setCategories(categoriesWithImages);
        }
    }, [products]);

    return (
        <div className='p-16 bg-[#F5F5DC]'>
            <h2 className='text-3xl font-semibold mb-6 text-gray-800'>Explora Nuestras Categorías</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categories.map(category => (
                    <Link to={category.path} key={category.id}>
                        <div className='relative overflow-hidden rounded-lg shadow-lg'>
                            <div className='absolute inset-0 bg-gray-900 opacity-75 flex items-center justify-center text-white text-xl font-semibold transition-opacity duration-300 hover:opacity-0'>
                                {category.name}
                            </div>
                            <img src={category.image} alt={category.name} className='w-full h-64 object-cover' />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesGrid;


