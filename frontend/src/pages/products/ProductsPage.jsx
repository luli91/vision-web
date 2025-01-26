import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import ProductsCard from './ProductsCard';

const ProductsPage = () => {
    const { data: products = [] } = useFetchAllProductsQuery();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const filteredProducts = products
        .filter(product => selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true)
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
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">Productos</h2>
            <div className="mb-8 flex items-center gap-4">
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                >
                    <option value="">Todas las categorías</option>
                    <option value="Sol">Sol</option>
                    <option value="Lectura">Lectura</option>
                    <option value="Computadora">Computadora</option>
                    <option value="Deportivos">Deportivos</option>
                    <option value="Niños">Niños</option>
                    <option value="Moda">Moda</option>
                </select>
                <select
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                >
                    <option value="">Ordenar por</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                    <ProductsCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
