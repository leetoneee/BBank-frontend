import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    TaiKhoanNguon: "",
    LoaiTietKiem: "",
    SoTienGui: "",
    MaKhachHang: "",
    PhuongThuc: "",
    NgayMo: '',
    isTransactionSuccess: '',
    isLoading: false,
    isError: false
}

export const depositSaving = createAsyncThunk(
    'customer/depositSaving',
    async (requestOptions) => {
        let res = await axios.post("http://localhost:3005/api/v1/customer/account/transfer", requestOptions)
        return res.data;
    }
)

export const customerDepositSavingSlice = createSlice({
    name: 'customerDepositSaving',
    initialState,
    reducers: {
        setSoTK: (state, action) => {
            state.SoTK = action.payload;
        },
        setLoaiTietKiem: (state, action) => {
            state.LoaiTietKiem = action.payload;
        },
        setSoTienGui: (state, action) => {
            state.SoTienGui = action.payload;
        },
        setPhuongThuc: (state, action) => {
            state.PhuongThuc = action.payload;
        },
        setMaKhachHang: (state, action) => {
            state.MaKhachHang = action.payload;
        },
        setNgayMo: (state, action) => {
            state.NgayMo = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(depositSaving.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(depositSaving.fulfilled, (state, action) => {
                state.GiaoDich = action.payload.transaction;
                state.isTransactionSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(depositSaving.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setSoTK, setLoaiTietKiem, setSoTienGui, setPhuongThuc, setMaKhachHang, setNgayMo, reset } = customerDepositSavingSlice.actions

export default customerDepositSavingSlice.reducer