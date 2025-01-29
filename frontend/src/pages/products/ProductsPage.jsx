import React, { useState, useEffect } from 'react';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import { useParams } from 'react-router-dom';
import ProductsCard from './ProductsCard';

import bazar from '../../assets/category/bazar.jpg';
import homeDeco from '../../assets/category/Home_y_deco.jpg';
import regaleria from '../../assets/category/regaleria.jpg';
import bellezaCuidado from '../../assets/category/Belleza_y_cuidado_personal.jpg';
import jugueteria from '../../assets/category/Jugueteria.jpg';
import tecnologia from '../../assets/category/Tecnologia.jpg';

import storeBanner from '../../assets/bannerSeapicks.png';

const categoryImages = {
    'bazar': bazar,
    'home y deco': homeDeco,
    'regaleria': regaleria,
    'belleza y cuidado personal': bellezaCuidado,
    'jugueteria': jugueteria,
    'tecnologia': tecnologia,
};

const ProductsPage = () => {
    const { data: products = [] } = useFetchAllProductsQuery();
    const { category } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        setSelectedCategory(category || '');
    }, [category]);

    const filteredProducts = products
        .filter(product => selectedCategory ? product.category.trim().toLowerCase() === selectedCategory.toLowerCase() : true)
        .sort((a, b) => {
            if (sortOrder === 'price-asc') {
                return a.newPrice - b.newPrice;
            }
            if (sortOrder === 'price-desc') {
                return b.newPrice - a.newPrice;
            }
            return 0;
        });

    return (
        <div className="pt-0 overflow-hidden">
            {selectedCategory ? (
                <div className='relative mb-10 h-96'>
                    <div className='absolute inset-0 bg-gray-900 opacity-50 flex items-center justify-center'>
                        <h2 className='text-3xl font-semibold text-white'>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
                    </div>
                    <div className='h-full bg-fixed bg-center bg-cover' style={{ backgroundImage: `url(${categoryImages[selectedCategory.toLowerCase()]})` }}></div>
                </div>
            ) : (
                <div className='relative mb-10 h-96 overflow-hidden'>
                    <div className='absolute inset-0 bg-gray-900 opacity-50 flex items-center justify-center'>
                        <h2 className='text-3xl font-semibold text-white'>Todos los Productos</h2>
                    </div>
                    <div className='h-full w-full bg-fixed bg-center bg-cover' style={{ backgroundImage: `url(${storeBanner})`, maxWidth: '100%' }}></div>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
                {filteredProducts.map((product, index) => (
                    <ProductsCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;

