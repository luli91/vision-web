import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/Cart/CartSlice'
import favoriteReducer from './features/Favorites/FavoriteSlice';
import productsApi from './features/products/productsApi';
import ordersApi from './features/orders/ordersApi';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoriteReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, ordersApi.middleware),
});