import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT_URL } from '../../../services/api'
import axios from 'axios'

const initialState = {
    isExist: false,
    TaiKhoan: "",
    isLoading: false,
    isError: false,
}

export const checkAccountExist = createAsyncThunk(
    'system/checkAccountExist',
    async (requestOptions) => {
        let res = await axios.post(`${API_ROOT_URL}/system/account/check-exist`, requestOptions, { withCredentials: true })
        return res.data;
    }
)

export const checkAccountSlice = createSlice({
    name: 'checkAccount',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAccountExist.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(checkAccountExist.fulfilled, (state, action) => {
                if (action.payload.errMessage === 0) {
                    // existed
                    state.isExist = true;
                    state.TaiKhoan = action.payload.account;
                } else {
                    // not existed
                    state.isExist = false;
                }
                // state.check = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(checkAccountExist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { reset } = checkAccountSlice.actions

export default checkAccountSlice.reducer