import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    TaiKhoanNguon: "",
    TaiKhoanDich: "",
    SoTien: "",
    NoiDung: "",
    HinhThuc: "Người chuyển trả",
}

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
        setTaiKhoanDich: (state, action) => {
            state.TaiKhoanDich = action.payload;
        },
        setSoTien: (state, action) => {
            state.SoTien = action.payload;
        },
        setNoiDung: (state, action) => {
            state.NoiDung = action.payload;
        },
        setHinhThuc: (state, action) => {
            state.HinhThuc = action.payload;
        },
    },
})

export const { setTaiKhoanNguon, setTaiKhoanDich, setSoTien, setNoiDung, setHinhThuc } = transferSlice.actions

export default transferSlice.reducer