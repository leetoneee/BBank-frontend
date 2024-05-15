import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    SoTien: "",
    CCCD: "",
    NoiDung: "",
    GiaoDich: "",
    HinhThuc: 'Người chuyển trả',
    isTransactionSuccess: '',
    message: '',
    isLoading: false,
    isError: false
}

export const employeeDepositAccount = createAsyncThunk(
    'employeee/employeeDepositAccount',
    async (requestOptions) => {
        let res = await axios.post('/employee/account/deposit', requestOptions)
        return res.data;
    }
)

export const employeeDepositAccountSlice = createSlice({
    name: 'employeeDepositAccount',
    initialState,
    reducers: {
        setSoTien: (state, action) => {
            state.SoTien = action.payload;
        },
        setNoiDung: (state, action) => {
            state.NoiDung = action.payload;
        },
        setCCCD: (state, action) => {
            state.CCCD = action.payload;
        },
        setHinhThuc: (state, action) => {
            state.HinhThuc = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(employeeDepositAccount.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(employeeDepositAccount.fulfilled, (state, action) => {
                if (action.payload.errMessage === 0) {
                    state.GiaoDich = action.payload.transaction;
                    state.isTransactionSuccess = true;
                } else {
                    state.isTransactionSuccess = false;
                }
                state.message = action.payload.message
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(employeeDepositAccount.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanDich, setCCCD, setSoTien, setNoiDung, setHinhThuc, reset } = employeeDepositAccountSlice.actions

export default employeeDepositAccountSlice.reducer