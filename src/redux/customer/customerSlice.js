import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/axios'


const initialState = {
    listAccounts: "",
    isLoading: false,
    isError: false,
}

export const fetchAllAccountById = createAsyncThunk(
    'customer/fetchAllAccountById',
    async () => {
        let res = await axios.get('/accounts')
        return res.data;
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAccountById.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllAccountById.fulfilled, (state, action) => {
                state.listAccounts = action.payload.accounts;
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

export const { reset } = customerSlice.actions

export default customerSlice.reducer