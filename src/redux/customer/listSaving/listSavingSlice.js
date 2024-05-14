import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT_URL } from '../../../services/api'
import axios from 'axios'

const initialState = {
    PhieuTietKiem: "",
    listSavings: "",
    isLoading: false,
    isError: false,
}

export const fetchAllSavingByAccount = createAsyncThunk(
    'customer/fetchAllSavingByAccount',
    async (requestOptions) => {
        let res = await axios.post(`${API_ROOT_URL}/customer/saving/get-all`, requestOptions, { withCredentials: true })
        return res.data;
    }
)

export const listSavingSlice = createSlice({
    name: 'listSaving',
    initialState,
    reducers: {
        setPhieuTietKiem: (state, action) => {
            state.PhieuTietKiem = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSavingByAccount.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllSavingByAccount.fulfilled, (state, action) => {
                state.listSavings = action.payload.transaction;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllSavingByAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setPhieuTietKiem, reset } = listSavingSlice.actions

export default listSavingSlice.reducer