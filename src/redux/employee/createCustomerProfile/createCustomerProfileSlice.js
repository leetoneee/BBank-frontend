import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT_URL } from '../../../services/api'
import axios from 'axios'

const initialState = {
    NgayDangKy: "",
    HoTen: "",
    Birthday: "",
    GioiTinh: 1,
    SoDT: '',
    CCCD: '',
    DiaChi: '',
    NgheNghiep: '',
    Email: '',
    GiaoDich: "",
    isTransactionSuccess: '',
    message: '',
    isLoading: false,
    isError: false
}

export const createProfileCustomer = createAsyncThunk(
    'employeee/createProfileCustomer',
    async (requestOptions) => {
        let res = await axios.post(`${API_ROOT_URL}/employee/cif/create`, requestOptions)
        return res.data;
    }
)

export const createCustomerProfileSlice = createSlice({
    name: 'createCustomerProfile',
    initialState,
    reducers: {
        setNgayDangKy: (state, action) => {
            state.NgayDangKy = action.payload;
        },
        setHoTen: (state, action) => {
            state.HoTen = action.payload;
        },
        setBirthday: (state, action) => {
            state.Birthday = action.payload;
        },
        setGioiTinh: (state, action) => {
            state.GioiTinh = action.payload;
        },
        setSoDT: (state, action) => {
            state.SoDT = action.payload;
        },
        setCCCD: (state, action) => {
            state.CCCD = action.payload;
        },
        setDiaChi: (state, action) => {
            state.DiaChi = action.payload;
        },
        setNgheNghiep: (state, action) => {
            state.NgheNghiep = action.payload;
        },
        setEmail: (state, action) => {
            state.Email = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProfileCustomer.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createProfileCustomer.fulfilled, (state, action) => {
                if (action.payload.errCode === 0) {
                    state.isTransactionSuccess = true;
                } else {
                    state.message = action.payload.message
                    state.isTransactionSuccess = false;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createProfileCustomer.rejected, (state, action) => {
                state.isTransactionSuccess = false;
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { setNgayDangKy, setHoTen, setBirthday, setSoDT, setGioiTinh, setCCCD, setDiaChi, setNgheNghiep, setEmail, reset } = createCustomerProfileSlice.actions

export default createCustomerProfileSlice.reducer