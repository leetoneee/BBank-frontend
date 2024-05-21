import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    TaiKhoanNguon: "",
    LoaiTietKiem: "",
    SoTienGui: "",
    MaKhachHang: "",
    PhuongThuc: "",
    PhieuTietKiem: '',
    isTransactionSuccess: '',
    TamTinh: '',
    message: '',
    isLoading: false,
    isError: false
}

export const employeeDepositSaving = createAsyncThunk(
    'employeee/employeeDepositSaving',
    async (requestOptions) => {
        let res = await axios.post('/saving-accounts/deposit', requestOptions)
        return res.data;
    }
)

export const employeeDepositSavingSlice = createSlice({
    name: 'employeeDepositSaving',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
        setSoTienGui: (state, action) => {
            state.SoTienGui = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(employeeDepositSaving.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(employeeDepositSaving.fulfilled, (state, action) => {
                if (action.payload.errMessage === 0) {
                    state.PhieuTietKiem = action.payload.PhieuTietKiem;
                    state.TamTinh = action.payload.TamTinh;
                    state.isTransactionSuccess = true;
                } else {
                    state.message = action.payload.message
                    state.isTransactionSuccess = false;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(employeeDepositSaving.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanNguon, setLoaiTietKiem, setSoTienGui, setPhuongThuc, setMaKhachHang, setNgayMo, reset } = employeeDepositSavingSlice.actions

export default employeeDepositSavingSlice.reducer