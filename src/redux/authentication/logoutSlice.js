import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../services/axios';

const initialState = {

}

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        let res = await axios.post('/logout');
        return res.data;
    }
)

export const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})


export default logoutSlice.reducer


