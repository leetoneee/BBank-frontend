import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
    TaiKhoanNguon: "",
    TenTH: "",
    DiaChiTH: "",
    GiayToTH: "",
    SoGiayToTH: "",
    NgayCapTH: "",
    SoTien: "",
    NoiDung: "",
    HinhThuc: "Người chuyển trả",
    GiaoDich: "",
    isTransactionSuccess: '',
    isLoading: false,
    isError: false
}

export const cashtransferMoney = createAsyncThunk(
    'customer/cashtransferMoney',
    async (requestOptions) => {
        let res = await axios.post('/accounts/transfer', requestOptions)
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
            .addCase(cashtransferMoney.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(cashtransferMoney.fulfilled, (state, action) => {
                state.GiaoDich = action.payload.transaction;
                state.isTransactionSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(cashtransferMoney.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setTaiKhoanNguon, setTenTH, setDiaChiTH, setGiayToTH, setSoGiayToTH, setNgayCapTH, setSoTien, setNoiDung, setHinhThuc, reset } = cashtransferSlice.actions

export default cashtransferSlice.reducer