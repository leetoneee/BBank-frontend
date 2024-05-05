import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

    isLoading: false,
    isError: false,
}

export const fetchAllAccountByCustomerId = createAsyncThunk(
    'users/fetchAllAccount',
    async () => {
        let res = await axios.get("https://reqres.in/api/users/2")
        return res.data;
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAccountByCustomerId.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllAccountByCustomerId.fulfilled, (state, action) => {
                state.listAccount = action.payload.data;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllAccountByCustomerId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export default customerSlice.reducer