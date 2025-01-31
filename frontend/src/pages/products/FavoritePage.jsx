import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites, clearFavorites } from '../../redux/features/Favorites/FavoriteSlice';
import { addToCart } from '../../redux/features/Cart/CartSlice';
import { getImgUrl } from '../../utils/getImgUrl';

const FavoritePage = () => {
  const favoriteItems = useSelector((state) => state.favorites.favoriteItems);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const handleRemoveFromFavorites = (product) => {
    dispatch(removeFromFavorites(product));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    if (quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
      handleRemoveFromFavorites(product); 
    }
  };

  const handleQuantityChange = (product, qty) => {
    setQuantities({
      ...quantities,
      [product._id]: qty,
    });
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  return (
    <>
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">Favoritos</div>
            {favoriteItems.length > 0 && (
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  onClick={handleClearFavorites}
                  className="relative -m-2 py-1 px-2 bg-amber-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
                >
                  <span className="">Vaciar favoritos</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="flow-root">
              {
                favoriteItems.length > 0 ? (
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {
                      favoriteItems.map((product) => (
                        <li key={product?._id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt=""
                              src={`${getImgUrl(product?.coverImage)}`}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to='/'>{product?.title}</Link>
                                </h3>
                                <p className="sm:ml-4">${product?.newPrice}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Categoría: </strong> {product?.category}</p>
                            </div>
                            <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                              <div className="flex items-center">
                                <p className="text-gray-500 mr-2"><strong>Cantidad:</strong></p>
                                <input
                                  type="number"
                                  value={quantities[product._id] || 1}
                                  onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                                  min="1"
                                  className="w-16 ml-2 text-center border rounded"
                                />
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleRemoveFromFavorites(product)}
                                  type="button" 
                                  className="font-medium text-amber-500 hover:text-amber-300">
                                  Eliminar
                                </button>
                                <button 
                                  onClick={() => handleAddToCart(product)}
                                  type="button" 
                                  className="font-medium text-green-500 hover:text-green-300"
                                  disabled={!quantities[product._id] || quantities[product._id] < 1}
                                >
                                  Agregar al carrito
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                ) : (<p>No hay productos en favoritos</p>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
