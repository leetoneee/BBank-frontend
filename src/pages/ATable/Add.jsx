import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../services/axios';

function Add() {
  const [inputData, setInputData] = useState({MaPhieu:'',SoTienGui:'',MaKhachHang:'',MaLoaiTietKiem:'',TrangThai:''})

  const navigat = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:3005/api/v1/employee/saving/get-all/538104417/1', inputData)
    .then(res => {
        alert("Data Added Successfully!");
        navigat("/utilities");
    }).catch(err => console.log(err));
  }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex   z-[99999]'>
      <div className="flex w-full vh-100 justify-center items-center ">
        <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
          <form onSubmit={handleSubmit} >
            <div>
                <label >Mã phiếu:</label>
                <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({...inputData, MaPhieu: e.target.value})}/>
            </div>
            <div>
                <label >Số tiền gửi:</label>
                <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({...inputData, SoTienGui: e.target.value})} />
            </div>
            <div>
                <label >Mã khách hàng:</label>
                <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3" 
                onChange={e => setInputData({...inputData, MaKhachHang: e.target.value})}/>
            </div>
            <div>
                <label >Mã loại tiết kiệm:</label>
                <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3" 
                onChange={e => setInputData({...inputData, MaLoaiTietKiem: e.target.value})}/>
            </div>
            <div>
                <label >Trạng thái:</label>
                <input className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                onChange={e => setInputData({...inputData, TrangThai: e.target.value})} />
            </div>
            <br />
            <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                    Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add