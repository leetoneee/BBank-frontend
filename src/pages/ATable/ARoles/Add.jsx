import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import axios from '../../../services/axios';
import ConfirmationDropdown from '../../../components/Listbox/XacThucDropdown';
import { setLoaiTaiKhoan, createAccountCustomer } from "../../../redux/employee/createCustomerAccount/createCustomerAccountSlice";

function Add() {

  const [inputData, setInputData] = useState({ MaChucNang: '', MaNhom: '' })
  const [group, setGroup] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const navigat = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  
    axios.post('http://localhost:3005/api/v1/group-role/create',inputData)
      .then(res => {
        alert("Data Added Successfully!");
        navigat(-1);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex   z-[99999]'>
      <div className="flex w-full vh-100 justify-center items-center ">
        <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
          <form>
            <div>
              <label >Mã chức năng:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, MaChucNang: e.target.value })} />
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
              <button onClick={() => navigat("../roles")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
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