import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
    isExist: false,
    Account: "",
    elistSavings: "",
    isLoading: false,
    isError: false,
}

export const fetchAllSavingByAccount = createAsyncThunk(
    'employee/fetchAllSavingByAccount',
    async (cccd) => {
        let res = await axios.get(`/employee/saving/get-all/${cccd}/1`)
        return res.data;
    }
)

export const elistSavingSlice = createSlice({
    name: 'elistSaving',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.Account = action.payload;
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
                if (action.payload.errMessage === 1) {
                    state.isExist = false;
                } else {
                    state.isExist = true;
                    state.elistSavings = action.payload.transaction;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllSavingByAccount.rejected, (state, action) => {
                state.isExist = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setAccount, reset } = elistSavingSlice.actions

export default elistSavingSlice.reducer