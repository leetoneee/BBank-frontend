import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT_URL } from '../../../services/api'
import axios from 'axios'

const initialState = {
    TaiKhoanNguon: "",
    TaiKhoanDich: "",
    SoTien: "",
    NoiDung: "",
    HinhThuc: "Người chuyển trả",
    GiaoDich: "",
    isTransactionSuccess: '',
    isLoading: false,
    isError: false
}

export const transferMoney = createAsyncThunk(
    'customer/transferMoney',
    async (requestOptions) => {
        let res = await axios.post(`${API_ROOT_URL}/customer/account/transfer`, requestOptions, { withCredentials: true })
        return res.data;
    }
)

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
        setTaiKhoanDich: (state, action) => {
            state.TaiKhoanDich = action.payload;
        },
        setSoTien: (state, action) => {
            state.SoTien = action.payload;
        },
        setNoiDung: (state, action) => {
            state.NoiDung = action.payload;
        },
        setHinhThuc: (state, action) => {
            state.HinhThuc = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(transferMoney.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(transferMoney.fulfilled, (state, action) => {
                state.GiaoDich = action.payload.transaction;
                state.isTransactionSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(transferMoney.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanNguon, setTaiKhoanDich, setSoTien, setNoiDung, setHinhThuc, reset } = transferSlice.actions

export default transferSlice.reducer