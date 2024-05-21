import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../../../services/axios';
import { formatDateResult, formatDateSaving } from "../../../utils/formatDateAndTime";

function Edit() {
  const [inputData, setInputData] = useState({ MaNguoiDung:'', NgheNghiep:'', Email:'', SDT:'', DiaChi:'', CCCD:'', HoTen:'', NgaySinh:'', GioiTinh:'', username:'', password:'', MaNhom:'' });
  const navigat = useNavigate();
  const location = useLocation();
  const { transaction } = location.state || {};

  useEffect(() => {
    if (transaction) {
      setInputData({
        MaNguoiDung: transaction.MaNguoiDung,
        NgheNghiep: transaction.NgheNghiep,
        Email: transaction.Email,
        SDT: transaction.SDT,
        DiaChi: transaction.DiaChi,
        CCCD: transaction.CCCD,
        HoTen: transaction.HoTen,
        NgaySinh: transaction.NgaySinh,
        GioiTinh: transaction.GioiTinh,
        username: transaction.username,
        password: transaction.password,
        MaNhom: transaction.MaNhom,
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
              <label>Mã người dùng:</label>
              <input
                value={inputData.MaNguoiDung}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Nghề nghiệp:</label>
              <input
                value={inputData.NgheNghiep}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, NgheNghiep: e.target.value })}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                value={inputData.Email}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, Email: e.target.value })}
              />
            </div>
            <div>
              <label>Số điện thoại:</label>
              <input
                value={inputData.SDT}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, SDT: e.target.value })}
              />
            </div>
            <div>
              <label>Địa chỉ:</label>
              <input
                value={inputData.DiaChi}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, DiaChi: e.target.value })}
              />
            </div>
            <div>
              <label>Căn cước công dân:</label>
              <input
                value={inputData.CCCD}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Họ tên:</label>
              <input
                value={inputData.HoTen}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Ngày sinh:</label>
              <input
                value={formatDateSaving(inputData.NgaySinh)}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Giới tính:</label>
              <input
                value={inputData.GioiTinh}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                value={inputData.username}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                value={inputData.password}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, password: e.target.value })}
              />
            </div>
            <div>
              <label>Mã nhóm:</label>
              <input
                value={inputData.MaNhom}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, MaNhom: e.target.value })}
              />
            </div>

            <br />
            <div className="flex justify-around ">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Lưu
              </button>
              <button onClick={() => navigat("../users")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
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
