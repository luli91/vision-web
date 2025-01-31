import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/Cart/CartSlice';
import { useFetchProductByIdQuery } from '../../redux/features/products/productsApi';
import { getImgUrl } from '../../utils/getImgUrl';

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useFetchProductByIdQuery(id);
  const dispatch = useDispatch();


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error occurred while loading product info or Product not found</div>;

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{product?.title}</h1>
      <div className=''>
        <div>
          <img
            src={getImgUrl(product?.coverImage)}
            alt={product?.title}
            className="mb-8"
          />
        </div>
        <div className='mb-5'>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong> {product?.createdAt ? new Date(product.createdAt).toLocaleDateString() : ''}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {product?.category}
          </p>
          <p className="text-gray-700"><strong>Description:</strong> {product?.description}</p>
        </div>
        <button onClick={() => handleAddToCart(product)} className="btn-primary px-6 space-x-1 flex items-center gap-1">
          <FiShoppingCart className="" />
          <span>Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;

