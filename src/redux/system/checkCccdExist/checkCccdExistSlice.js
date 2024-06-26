import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'


const initialState = {
    isExist: false,
    NguoiDung: "",
    listAccounts: '',
    isLoading: false,
    isError: false,
}

export const checkCccdExist = createAsyncThunk(
    'system/checkCccdExist',
    async (cccd) => {
        let res = await axios.get(`/accounts/cccd-exist/${cccd}`)
        return res.data;
    }
)

export const checkCccdSlice = createSlice({
    name: 'checkCccd',
    initialState,
    reducers: {
        setListAccount: (state, action) => {
            state.listAccounts = action.payload;
        },
        setNguoiDung: (state, action) => {
            state.NguoiDung = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkCccdExist.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(checkCccdExist.fulfilled, (state, action) => {
                if (action.payload.errMessage === 1) {
                    state.isExist = false;
                } else {
                    state.isExist = true;
                    state.NguoiDung = action.payload.NguoiDung;
                    state.listAccounts = action.payload.DanhSachTaiKhoan;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(checkCccdExist.rejected, (state, action) => {
                state.isExist = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setListAccount, setNguoiDung, reset } = checkCccdSlice.actions

export default checkCccdSlice.reducer