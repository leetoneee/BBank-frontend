import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT_URL } from '../../../services/api'
import axios from 'axios'

const initialState = {
    isSuccess: '',
    otp: '',
    isLoading: false,
    isError: false,
}

export const sendOtp = createAsyncThunk(
    'system/sendOtp',
    async (requestOptions) => {
        let res = await axios.post(`${API_ROOT_URL}/system/otp/send`, requestOptions, { withCredentials: true })
        return res.data;
    }
)

export const sendOtpSlice = createSlice({
    name: 'sendOtp',
    initialState,
    reducers: {
        setOtp: (state, action) => {
            state.otp = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                if (action.payload.errMessage === 0) {
                    // success
                    state.isSuccess = true;
                } else {
                    // fail
                    state.isSuccess = false;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setOtp, reset } = sendOtpSlice.actions

export default sendOtpSlice.reducer