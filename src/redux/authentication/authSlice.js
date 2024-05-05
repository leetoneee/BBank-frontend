import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: "",
    lastLoginTime: "",
}

// const loginUser - createAsyncThunk(
//     'user/loginUser',
//     async (userCredentials) => {
//         let res = await axios
//     }
// )
export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.username;
            state.lastLoginTime = action.payload.currentTime;
        },
        logout: (state) => {
            state.user = ''
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer


