import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    userId: '',
    ten: '',
    currentAccount: '',
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
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setTen: (state, action) => {
            state.ten = action.payload;
        },
        setCurrentAccount: (state, action) => {
            state.currentAccount = action.payload;
        },
        reset: () => initialState,
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

export const { setUserId, setTen, setCurrentAccount, reset } = userSlice.actions

export default userSlice.reducer