import axios from "axios";

const raw = {
    "MaKhachHang": 30
};

const callAPI = async (requestOptions) => {
    let res = await axios.post("http://localhost:3005/api/v1/customer/account/get-all", requestOptions)
    console.log(res.data)
    return res.data
}

callAPI(raw);

// const raw = {
//     "SoTaiKhoan": "11125639878"
// };

// const callAPI = async (requestOptions) => {
//     let res = await axios.post("http://localhost:3005/api/v1/system/account/check-exist", requestOptions)
//     console.log(res.data)
//     return res.data
// }

// callAPI(raw);

// const raw = {
//     "SoTien": 20000,
//     "NoiDung": "test API",
//     "SoTKNhan": "33795439972",
//     "SoTKRut": "33795439912",
//     "MaLoaiGD": 3
// };

// const callAPI = async (requestOptions) => {
//     let res = await axios.post("http://localhost:3005/api/v1/customer/account/transfer", requestOptions)
//     console.log(res.data)
//     return res.data
// }

// callAPI(raw);


