import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import ProductsCard from './ProductsCard';

const SearchResultsPage = () => {
    const { data: products = [] } = useFetchAllProductsQuery();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="py-10">
            <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Resultados de búsqueda: {query}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductsCard key={index} product={product} />
                    ))
                ) : (
                    <div className="col-span-4 text-center">
                        <p className='text-xl font-semibold'>No se encontraron productos para "{query}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;

