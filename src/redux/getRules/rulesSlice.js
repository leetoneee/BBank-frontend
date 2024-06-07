import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/axios'

const initialState = {
    listRules: '',
    isLoading: false,
    isError: false,
    // Thêm các biến riêng biệt cho mỗi MaThamSo với kiểu dữ liệu number
    DoTuoiToiThieu: 0,
    SoLuongTaiKhoan: 0,
    SoTienDuyTriTaiKhoan: 0,
    SoTienRutToiThieu: 0,
    TienGuiTietKiemToiThieu: 0,
    SoTienChuyenKhoanToiThieu: 0,
    SoTienChuyenKhoanToiDa: 0,
    ThoiGianGuiTietKiemToiThieu: 0,
}

export const getRules = createAsyncThunk(
    'user/getRules',
    async () => {
        let res = await axios.get('/rule/get-all')
        return res.data;
    }
)

export const rulesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRules.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getRules.fulfilled, (state, action) => {
                state.listRules = action.payload.listRole;
                state.isLoading = false;
                state.isError = false;

                // Ánh xạ giá trị từ listRole vào các biến riêng biệt trong state
                action.payload.listRole.forEach(role => {
                    const value = Number(role.GiaTri); // Chuyển đổi GiaTri thành number
                    switch (role.MaThamSo) {
                        case 1:
                            state.DoTuoiToiThieu = value;
                            break;
                        case 2:
                            state.SoLuongTaiKhoan = value;
                            break;
                        case 3:
                            state.SoTienDuyTriTaiKhoan = value;
                            break;
                        case 4:
                            state.SoTienRutToiThieu = value;
                            break;
                        case 5:
                            state.TienGuiTietKiemToiThieu = value;
                            break;
                        case 6:
                            state.SoTienChuyenKhoanToiThieu = value;
                            break;
                        case 7:
                            state.SoTienChuyenKhoanToiDa = value;
                            break;
                        case 8:
                            state.ThoiGianGuiTietKiemToiThieu = value;
                            break;
                        default:
                            break;
                    }
                });
            })
            .addCase(getRules.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.error.message);
            })
    }
})

export const { reset } = rulesSlice.actions

export default rulesSlice.reducer
