import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    TaiKhoanNguon: "",
}

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
    },
})

export const { setTaiKhoanNguon } = transferSlice.actions

export default transferSlice.reducer