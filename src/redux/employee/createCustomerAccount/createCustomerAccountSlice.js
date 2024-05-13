import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT_URL } from '../../../services/api'
import axios from 'axios'

const initialState = {
    CCCD: '',
    listAccounts: [],
    LoaiTaiKhoan: "",
    account: '',
    isTransactionSuccess: '',
    message: '',
    isLoading: false,
    isError: false
}

export const createAccountCustomer = createAsyncThunk(
    'employeee/createAccountCustomer',
    async (requestOptions) => {
        let res = await axios.post(`${API_ROOT_URL}/employee/account/create`, requestOptions)
        return res.data;
    }
)

export const createCustomerAccountSlice = createSlice({
    name: 'createCustomerAccount',
    initialState,
    reducers: {
        setCCCD: (state, action) => {
            state.CCCD = action.payload;
        },
        setLoaiTaiKhoan: (state, action) => {
            state.LoaiTaiKhoan = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccountCustomer.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createAccountCustomer.fulfilled, (state, action) => {
                if (action.payload.errMessage === 0) {
                    state.isTransactionSuccess = true;
                    state.account = action.payload.account;
                } else {
                    state.message = action.payload.message
                    state.isTransactionSuccess = false;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createAccountCustomer.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setCCCD, setLoaiTaiKhoan, reset } = createCustomerAccountSlice.actions

export default createCustomerAccountSlice.reducer