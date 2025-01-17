import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/Cart/CartSlice'
import productsApi from './features/Cart/productsApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});