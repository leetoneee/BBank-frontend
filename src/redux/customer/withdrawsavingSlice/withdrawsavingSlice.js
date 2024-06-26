import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    TaiKhoanNguon: "",
    GiaoDich: "",
    isTransactionSuccess: '',
    isLoading: false,
    isError: false
}

export const withdrawSaving = createAsyncThunk(
    'customer/withdrawSaving',
    async (requestOptions) => {
        let res = await axios.post('saving-accounts/withdraw', requestOptions)
        return res.data;
    }
)

export const customerWithdrawSavingSlice = createSlice({
    name: 'customerWithdrawSaving',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(withdrawSaving.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(withdrawSaving.fulfilled, (state, action) => {
                state.GiaoDich = action.payload.PhieuTietKiem;
                state.isTransactionSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(withdrawSaving.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanNguon, reset } = customerWithdrawSavingSlice.actions

export default customerWithdrawSavingSlice.reducer