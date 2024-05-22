import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom'
import axios from '../../../services/axios';
import ConfirmationDropdown from '../../../components/Listbox/XacThucDropdown';
import { setLoaiTaiKhoan, createAccountCustomer } from "../../../redux/employee/createCustomerAccount/createCustomerAccountSlice";

function Add() {

  const [inputData, setInputData] = useState({ TenChucNang: '', Url: '', NhomNguoiDung:[] })
  const [group, setGroup] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const navigat = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  
    axios.post('http://localhost:3005/api/v1/role/create',inputData)
      .then(res => {
        alert("Data Added Successfully!");
        navigat(-1);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('/group/get-all')
        .then(res => {
            setGroup(res.data.listRole)
        })
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedGroups(prevSelectedGroups => {
          if (checked) {
            return [...prevSelectedGroups, value];
          } else {
            return prevSelectedGroups.filter(group => group !== value);
          }
        });
        setInputData(prevInputData => {
            if (checked) {
              return { ...prevInputData, NhomNguoiDung: [...prevInputData.NhomNguoiDung, value] };
            } else {
              return { ...prevInputData, NhomNguoiDung: prevInputData.NhomNguoiDung.filter(group => group !== value) };
            }
          });
      };
  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex   z-[99999]'>
      <div className="flex w-full vh-100 justify-center items-center ">
        <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
          <form>
            <div>
              <label >Tên chức năng:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, TenChucNang: e.target.value })} />
            </div>
            <div>
              <label >Url:</label>
              <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({ ...inputData, Url: e.target.value })} />
            </div>
            <div>
                <label>Nhóm người dùng:</label>
                
                {group.map((d, item) => (
                    <div key={item} className='px-4'>
                    <input 
                        type="checkbox"
                        id={`group-${d.MaNhom}`}
                        value={d.MaNhom}
                        onChange={handleCheckboxChange}
                        className="w-6 h-6"
                    />
                    <label className='px-4' htmlFor={`group-${d.MaNhom}`}>{d.MaNhom} - {d.TenNhom}</label>
                    </div>
                ))}
            </div>

            <br />
            <div className="flex justify-around">
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Thêm
              </button>
              <button onClick={() => navigat("../features")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
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