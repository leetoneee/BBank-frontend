import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/axios'


const initialState = {
    listSavingTypes: '',
    isLoading: false,
    isError: false,
}

export const getSavingType = createAsyncThunk(
    'user/getSavingType',
    async () => {
        let res = await axios.get('/saving-type/get-all')
        return res.data;
    }
)

export const savingTypeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSavingType.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getSavingType.fulfilled, (state, action) => {
                state.listSavingTypes = action.payload.savingTypes;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getSavingType.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { reset } = savingTypeSlice.actions

export default savingTypeSlice.reducer