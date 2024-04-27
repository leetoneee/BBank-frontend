import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    userData: {},
    isLoading: false,
    isError: false,
}

export const fetchUserData = createAsyncThunk(
    'users/fetchUserData',
    async () => {
        let res = await axios.get("https://reqres.in/api/users/2")
        return res.data;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userData = action.payload.data;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export default userSlice.reducer