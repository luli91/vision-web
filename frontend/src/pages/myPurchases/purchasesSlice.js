import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userPurchases: [],
    status: 'idle',
    error: null,
};

export const fetchUserPurchases = createAsyncThunk('purchases/fetchUserPurchases', async (email) => {
    const response = await axios.get(`/api/purchases?email=${email}`);
    return response.data;
});

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserPurchases.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPurchases.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userPurchases = action.payload;
            })
            .addCase(fetchUserPurchases.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default purchasesSlice.reducer;
