import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += (action.payload.quantity || 1); 
            } else {
                state.cartItems.push({ ...action.payload, quantity: action.payload.quantity || 1 }); 
            }

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1500
            });
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item._id === productId);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity = quantity;
            }
        }
        
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
