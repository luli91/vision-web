import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';

const ProductsCard = ({ producto }) => {
    console.log(getImgUrl(producto.coverImage));

    return (
        <div className="rounded-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                <div className="h-60 sm:w-48 flex-shrink-0 border rounded-md overflow-hidden">
                    <a href="/">
                        <img
                            src={`${getImgUrl(producto?.coverImage)}`}
                            alt=""
                            className="h-full w-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </a>
                </div>

                <div>
                    <Link to={`/productos/${producto.id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {producto?.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">
                        {producto?.description.length > 80 ? `${producto?.description.slice(0, 80)} ...` : producto.description}
                    </p>
                    <p className="font-medium mb-5">
                        ${producto?.newPrice}{' '}
                        <span className="line-through font-normal ml-2">${producto?.oldPrice}</span>
                    </p>
                    <button className="btn-primary px-6 space-x-1 flex items-center gap-1">
                        <FiShoppingCart className="" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;
