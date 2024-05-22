import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../services/axios';

const initialState = {
    user: "",
    isLoginSuccess: '',
    lastLoginTime: "",
    isLoading: false,
    isError: false,
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (requestOptions) => {
        let res = await axios.post('/login', requestOptions);
        return res.data;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
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
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
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
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoginSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setUser, setLastLoginTime, setIsLoginSuccess, logout } = authSlice.actions

export default authSlice.reducer


