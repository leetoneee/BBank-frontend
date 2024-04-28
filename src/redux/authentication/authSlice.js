import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: "",
    lastLoginTime: "",
}

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


