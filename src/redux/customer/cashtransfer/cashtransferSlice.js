import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    TaiKhoanNguon: "",
    TenTH:"",
    DiaChiTH:"",
    GiayToTH:"",
    SoGiayToTH:"",
    NgayCapTH:"",
    SoTien: "",
    NoiDung: "",
    HinhThuc: "Người chuyển trả",
    GiaoDich: "",
    isLoading: false,
    isError: false
}

export const transferMoney = createAsyncThunk(
    'customer/transferMoney',
    async (requestOptions) => {
        let res = await axios.post("http://localhost:3005/api/v1/customer/account/transfer", requestOptions)
        return res.data;
    }
)

export const cashtransferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setTaiKhoanNguon: (state, action) => {
            state.TaiKhoanNguon = action.payload;
        },
        setTenTH: (state, action) => {
            state.TenTH = action.payload;
        },
        setDiaChiTH: (state, action) => {
            state.DiaChiTH = action.payload;
        },
        setGiayToTH: (state, action) => {
            state.GiayToTH = action.payload;
        },
        setSoGiayToTH: (state, action) => {
            state.SoGiayToTH = action.payload;
        },
        setNgayCapTH: (state, action) => {
            state.NgayCapTH = action.payload;
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
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(transferMoney.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(transferMoney.fulfilled, (state, action) => {
                state.GiaoDich = action.payload.transaction;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(transferMoney.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanNguon, setTenTH, setDiaChiTH, setGiayToTH, setSoGiayToTH, setNgayCapTH, setSoTien, setNoiDung, setHinhThuc, reset } = cashtransferSlice.actions

export default cashtransferSlice.reducer