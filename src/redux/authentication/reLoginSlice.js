import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../services/axios';

const initialState = {
    user: "",
    isLoginSuccess: '',
    lastLoginTime: "",
    isLoading: false,
    isError: false,
}

export const reLoginUser = createAsyncThunk(
    'auth/reLoginUser',
    async () => {
        let res = await axios.get('/user/info');
        return res.data;
    }
)

export const reLoginSlice = createSlice({
    name: 'reLogin',
    initialState,
    reducers: {
        setLastLoginTime: (state, action) => {
            state.lastLoginTime = action.payload;
        },
        setIsLoginSuccess: (state, action) => {
            state.isLoginSuccess = action.payload;
        },
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(reLoginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(reLoginUser.fulfilled, (state, action) => {
                if (action.payload.errCode === 0) {
                    // Login success
                    state.isLoginSuccess = true;
                    state.user = action.payload.user;
                } else {
                    // wrong password
                    state.isLoginSuccess = false;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(reLoginUser.rejected, (state, action) => {
                state.isLoginSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setLastLoginTime, setIsLoginSuccess, logout } = reLoginSlice.actions

export default reLoginSlice.reducer


