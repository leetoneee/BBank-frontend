import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom'
import axios from '../../../services/axios';
import ConfirmationDropdown from '../../../components/Listbox/XacThucDropdown';
import { setLoaiTaiKhoan, createAccountCustomer } from "../../../redux/employee/createCustomerAccount/createCustomerAccountSlice";

function Add() {

  const [inputData, setInputData] = useState({ NgheNghiep:'', Email:'', SDT:'', DiaChi:'', CCCD:'', HoTen:'', NgaySinh:'', GioiTinh:'', username:'', password:'', MaNhom:'' })
  const [group, setGroup] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const navigat = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  
    axios.post('/user/create',inputData)
      .then(res => {
        alert("Data Added Successfully!");
        navigat(-1);
      })
      .catch(err => console.log(err));
  }

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-');
    
    setInputData({ ...inputData, NgaySinh: formattedDate });
};

  return (
    <div className=' top-0 left-0 h-screen w-screen flex  overflow-auto '>
      <div className="flex w-full vh-100 justify-center items-center ">
        <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
          <form>
            <div>
              <label >Nghề nghiệp:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, NgheNghiep: e.target.value })} />
            </div>
            <div>
              <label >Email:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e =>  setInputData({ ...inputData, Email: e.target.value })} />
            </div>
            <div>
              <label >Số điện thoại:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, SDT: e.target.value })} />
            </div>
            <div>
              <label >Địa chỉ:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e =>  setInputData({ ...inputData, DiaChi: e.target.value })} />
            </div>
            <div>
              <label >Căn cước công dân:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, CCCD: e.target.value })} />
            </div>
            <div>
              <label >Họ tên:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e =>  setInputData({ ...inputData, HoTen: e.target.value })} />
            </div>
            <div>
              <label >Ngày sinh:</label>
              <input type='date' className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={handleDateChange} />
            </div>
            <div>
              <label >Giới tính (Nữ: 0 / Nam: 1):</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e =>  setInputData({ ...inputData, GioiTinh: e.target.value })} />
            </div>
            <div>
              <label >Username:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, username: e.target.value })} />
            </div>
            <div>
              <label >Password:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e =>  setInputData({ ...inputData, password: e.target.value })} />
            </div>
            <div>
              <label >Mã nhóm:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, MaNhom: e.target.value })} />
            </div>

            <br />
            <div className="flex justify-around">
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Thêm
              </button>
              <button onClick={() => navigat("../users")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Thoát
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add