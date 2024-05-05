import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    listAccount: {},
    isLoading: false,
    isError: false,
}

export const fetchAllAccountById = createAsyncThunk(
    'customer/fetchAllAccountById',
    async (requestOptions) => {
        console.log(requestOptions);
        let res = await fetch("http://localhost:3005/api/v1/customer/account/get-all", requestOptions);
        console.log(res);
        return res;
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAccountById.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllAccountById.fulfilled, (state, action) => {
                state.listAccount = action.payload.data;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllAccountById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})


export default customerSlice.reducer