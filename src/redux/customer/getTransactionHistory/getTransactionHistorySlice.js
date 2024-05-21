import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
    ThoiGian: undefined,
    StartDate: "",
    EndDate: "",
    transactions: "",
    isTransactionSuccess: '',
    isLoading: false,
    isError: false
}

export const getTransactionHistory = createAsyncThunk(
    'customer/getTransactionHistory',
    async (requestOptions) => {
        let res = await axios.post('/transaction/get-all', requestOptions)
        return res.data;
    }
)

export const getTransactionHistorySlice = createSlice({
    name: 'getTransactionHistory',
    initialState,
    reducers: {
        setThoiGian: (state, action) => {
            state.ThoiGian = action.payload;
        },
        setStartDate: (state, action) => {
            state.StartDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.EndDate = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactionHistory.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getTransactionHistory.fulfilled, (state, action) => {
                state.transactions = action.payload.transactions;
                state.isTransactionSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getTransactionHistory.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setThoiGian, setStartDate, setEndDate, reset } = getTransactionHistorySlice.actions

export default getTransactionHistorySlice.reducer