import { createSlice } from '@reduxjs/toolkit'

export const kyhanSlice = createSlice({
    name: 'kyhan',
    initialState: {
        KyHan: '',
        NgayDenHan: ''
    },

    reducers: {
        setKyHan: (state, action) => {
            state.KyHan = action.payload;
        },
        setNgayDenHan: (state, action) => {
            state.NgayDenHan = action.payload;
        }
    },
})

export const { setKyHan, setNgayDenHan } = kyhanSlice.actions;

export default kyhanSlice.reducer;