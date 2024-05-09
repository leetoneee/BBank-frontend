import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

const initialState = {
    userId: '',
    ten: '',
    maNhom: '',
    currentAccount: '',
    isLoading: false,
    isError: false,
}


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
        setMaNhom: (state, action) => {
            state.maNhom = action.payload;
        },
        setCurrentAccount: (state, action) => {
            state.currentAccount = action.payload;
        },
        reset: () => initialState,
    },
})

export const { setUserId, setTen, setMaNhom, setCurrentAccount, reset } = userSlice.actions

export default userSlice.reducer