import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
    TaiKhoanNguon: "",
    LoaiTietKiem: "",
    SoTienGui: "",
    MaKhachHang: "",
    PhuongThuc: "",
    NgayMo: '',
    PhieuTietKiem: '',
    isTransactionSuccess: '',
    isLoading: false,
    isError: false
}

export const depositSaving = createAsyncThunk(
    'customer/depositSaving',
    async (requestOptions) => {
        let res = await axios.post('/customer/saving/deposit', requestOptions)
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
                state.PhieuTietKiem = action.payload.PhieuTietKiem;
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