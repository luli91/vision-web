import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/Cart/CartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/features/Favorites/FavoriteSlice';

const ProductsCard = ({ product }) => {
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.favorites.favoriteItems);
    const isFavorite = favoriteItems.some(item => item._id === product._id);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleToggleFavorite = (product) => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product));
        } else {
            dispatch(addToFavorites(product));
        }
    };

    return (
        <div className="rounded-lg transition-shadow duration-300 relative">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={() => handleToggleFavorite(product)}>
                {isFavorite ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-gray-500" />}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                <div className="h-60 sm:w-48 flex-shrink-0 border rounded-md overflow-hidden">
                    <Link to={`/products/${product._id}`}>
                        <img
                            src={`${getImgUrl(product.coverImage)}`}
                            alt={product.title}
                            className="h-full w-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div>
                    <Link to={`/products/${product._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {product.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">
                        {product.description.length > 80 ? `${product.description.slice(0, 80)} ...` : product.description}
                    </p>
                    <p className="font-medium mb-5">
                        ${product.newPrice} <span className="line-through font-normal ml-2">${product.oldPrice}</span>
                    </p>
                    <button
                        onClick={() => handleAddToCart(product)}
                        className="btn-primary px-6 space-x-1 flex items-center gap-1">
                        <FiShoppingCart className="" />
                        <span>Agregar al carrito</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;
