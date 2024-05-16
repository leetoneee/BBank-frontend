import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    listFee: '',
    isLoading: false,
    isError: false,
}

export const getTransactionType = createAsyncThunk(
    'system/getTransactionType',
    async () => {
        let res = await axios.get('/transaction-fees')
        return res.data;
    }
)

export const getTransactionTypeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactionType.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getTransactionType.fulfilled, (state, action) => {
                state.listFee = action.payload.listFee;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getTransactionType.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { reset } = getTransactionTypeSlice.actions

export default getTransactionTypeSlice.reducer