import axios from "axios";

//* get all account by MaKhachHang
// const raw = {
//     "MaKhachHang": 1
// };

// fetch("http://localhost:3005/api/v1/customer/account/get-all", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));

//* check account exist

// const raw = {
//     "SoTaiKhoan": "11125639878"
// };

// const callAPI = async (requestOptions) => {
//     let res = await axios.post("http://localhost:3005/api/v1/system/account/check-exist", requestOptions)
//     console.log(res.data)
//     return res.data
// }

// callAPI(raw);

//* create transaction

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

//* login

// const raw = {
//     "username": "taolaletoan",
//     "password": "123456"
// };

// const callAPI = async (requestOptions) => {
//     let res = await axios.post("http://localhost:3005/api/v1/login", requestOptions)
//     console.log(res.data)
//     return res.data
// }

// callAPI(raw);

//* send OTP

// const raw = {
//     "otp": "13123",
//     "email": "leetone7442@gmail.com"
// }

// const callAPI = async (requestOptions) => {
//     let res = await axios.post("http://localhost:3005/api/v1/system/otp/send", requestOptions)
//     console.log(res.data)
//     return res.data
// }

// callAPI(raw);

// import crypto from 'crypto';

// // Secure random number generator (e.g., using crypto-random)
// function generateSecureRandomNumber(digits) {
//     const randomBytes = crypto.randomBytes(digits);
//     return parseInt(randomBytes.toString('hex'), 16);
// }

// const otp = generateSecureRandomNumber(6); // Generate 6-digit OTP
// console.log("🚀 ~ otp:", otp)



//* get saving types

// const callAPI = async () => {
//     let res = await axios.get("http://localhost:3005/api/v1/saving-type/get-all")
//     console.log(res.data)
//     return res.data
// }

// callAPI();

const raw = {
    "SoTienGui": 3000000,
    "PhuongThuc": "Lãi nhập gốc",
    "MaLoaiTietKiem": 3,
    "MaKhachHang": 40,
    "SoTK": "11538104417"
};


// const callAPI = async (requestOptions) => {
//     let res = await axios.post("http://localhost:3005/api/v1/customer/saving/deposit", requestOptions)
//     console.log(res.data)
//     return res.data
// }
// callAPI(raw);


