import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    TaiKhoanNguon: "",
    SoTienRut: "",
    NoiDung: "",
    HinhThuc: "Người chuyển trả",
    isTransactionSuccess: '',
    transaction: '',
    message: '',
    isLoading: false,
    isError: false
}

export const employeeWithdrawAccount = createAsyncThunk(
    'employeee/employeeWithdrawAccount',
    async (requestOptions) => {
        let res = await axios.post('/accounts/withdraw', requestOptions)
        return res.data;
    }
)

export const employeeWithdrawAccountSlice = createSlice({
    name: 'employeeWithdrawAccount',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
        setSoTienRut: (state, action) => {
            state.SoTienRut = action.payload;
        },
        setHinhThuc: (state, action) => {
            state.HinhThuc = action.payload;
        },
        setNoiDung: (state, action) => {
            state.NoiDung = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(employeeWithdrawAccount.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(employeeWithdrawAccount.fulfilled, (state, action) => {
                if (action.payload.errMessage === 0) {
                    state.transaction = action.payload.transaction;
                    state.isTransactionSuccess = true;
                } else {
                    state.isTransactionSuccess = false;
                }
                state.message = action.payload.message
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(employeeWithdrawAccount.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanNguon, setHinhThuc, setSoTienRut, setNoiDung, reset } = employeeWithdrawAccountSlice.actions

export default employeeWithdrawAccountSlice.reducer