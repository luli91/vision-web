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
            console.log('Payload:', action.payload);
            console.log('State before mutation:', JSON.parse(JSON.stringify(state.cartItems))); 
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            console.log('Existing Item:', existingItem);

            if (!existingItem) {
                state.cartItems.push(action.payload); 
                console.log('Cart items after mutation:', JSON.parse(JSON.stringify(state.cartItems)));

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto agregado al carrito',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: '¿Estás seguro que no lo querés en el carrito?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK!'
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
