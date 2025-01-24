import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
    favoriteItems: [],
};

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const existingItem = state.favoriteItems.find(item => item._id === action.payload._id);
            
            if (!existingItem) {
                state.favoriteItems.push(action.payload);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto agregado a favoritos',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: 'Este producto ya está en favoritos',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        removeFromFavorites: (state, action) => {
            state.favoriteItems = state.favoriteItems.filter(item => item._id !== action.payload._id);
        },
        clearFavorites: (state) => {
            state.favoriteItems = [];
        },
    },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
