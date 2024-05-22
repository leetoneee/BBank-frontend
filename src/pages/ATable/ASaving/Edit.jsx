import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../../../services/axios';
import { formatDateResult, formatDateSaving } from "../../../utils/formatDateAndTime";
import formatToVND from "../../../utils/formatToVND";
import roundInterest from "../../../utils/roundInterest";

function Edit() {
  const [inputData, setInputData] = useState({ MaPhieu:'', NgayMo:'', SoTienGui:'', LaiSuat:'', NgayRut:'', SoTienRut:'', PhuongThuc:'', TrangThai:'', MaLoaiTietKiem:'', MaKhachHang:'', SoTK:''});
  const navigat = useNavigate();
  const location = useLocation();
  const { transaction } = location.state || {};

  useEffect(() => {
    if (transaction) {
      setInputData({
        MaPhieu: transaction.MaPhieu,
        NgayMo: transaction.NgayMo,
        SoTienGui: transaction.SoTienGui,
        LaiSuat: transaction.LaiSuat,
        NgayRut: transaction.NgayRut,
        SoTienRut: transaction.SoTienRut,
        PhuongThuc: transaction.PhuongThuc,
        TrangThai: transaction.TrangThai,
        MaLoaiTietKiem: transaction.MaLoaiTietKiem,
        MaKhachHang: transaction.MaKhachHang,
        SoTK: transaction.SoTK,
      });
    }
  }, [transaction]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('/user/update', inputData)
      .then(res => {
        alert("Data Updated Successfully!");
        navigat(-1);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className=' top-0 left-0 h-screen w-screen flex'>
      <div className="flex w-full vh-100 justify-center items-center">
        <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Mã phiếu:</label>
              <input
                value={inputData.MaPhieu}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Ngày mở:</label>
              <input
                value={formatDateResult(inputData.NgayMo)}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Số tiền gửi:</label>
              <input
                value={formatToVND(inputData.SoTienGui)}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Lãi suất:</label>
              <input
                value={`${roundInterest(inputData.LaiSuat * 100)}%`} 
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Ngày rút:</label>
              <input
                value={inputData.NgayRut ? formatDateResult(inputData.NgayRut) : ''} 
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Số tiền rút:</label>
              <input
                value={inputData.SoTienRut ? formatToVND(inputData.SoTienRut): ''}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Phương thức:</label>
              <input
                value={inputData.PhuongThuc}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Mã loại tiết kiệm:</label>
              <input
                value={inputData.MaLoaiTietKiem}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Mã khách hàng:</label>
              <input
                value={inputData.MaKhachHang}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Số tài khoản:</label>
              <input
                value={inputData.SoTK}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>

            <br />
            <div className="flex justify-around ">
              <button onClick={() => navigat("../savings")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Thoát
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
