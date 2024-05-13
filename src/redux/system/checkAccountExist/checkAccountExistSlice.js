import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    isExist: false,
    TaiKhoan: "",
    isLoading: false,
    isError: false,
}

export const checkAccountExist = createAsyncThunk(
    'system/checkAccountExist',
    async (requestOptions) => {
        let res = await axios.post('/system/account/check-exist', requestOptions)
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