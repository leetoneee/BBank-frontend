import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    TaiKhoanNguon: "",
    GiaoDich: "",
    isTransactionSuccess: '',
    isLoading: false,
    isError: false
}

export const withdrawsavingMoney = createAsyncThunk(
    'customer/withdrawsavingMoney',
    async (requestOptions) => {
        let res = await axios.post('/customer/account/transfer', requestOptions)
        return res.data;
    }
)

export const withdrawsavingSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(withdrawsavingMoney.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(withdrawsavingMoney.fulfilled, (state, action) => {
                state.GiaoDich = action.payload.transaction;
                state.isTransactionSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(withdrawsavingMoney.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanNguon, reset } = withdrawsavingSlice.actions

export default withdrawsavingSlice.reducer