import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
    year: '',
    revenueByMonth: '',
    isSuccess: '',
    isLoading: false,
    isError: false,
}

export const getSavingRevenue = createAsyncThunk(
    'admin/getSavingRevenue',
    async (year) => {
        let res = await axios.get(`/dashboard/saving-revenue/${year}`)
        return res.data;
    }
)

export const getSavingRevenueSlice = createSlice({
    name: 'getSavingRevenue',
    initialState,
    reducers: {
        setYear: (state, action) => {
            state.year = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSavingRevenue.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getSavingRevenue.fulfilled, (state, action) => {
                if (action.payload.errCode === 0) {
                    state.revenueByMonth = action.payload.revenueByMonth;
                    state.isSuccess = true;
                } else
                    state.isSuccess = false;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getSavingRevenue.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setYear, reset } = getSavingRevenueSlice.actions

export default getSavingRevenueSlice.reducer