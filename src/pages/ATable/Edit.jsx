import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../services/axios';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

function Edit() {

    const {MaPhieu} = useParams();
    const [data, setData] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const PhieuTietKiem = useSelector((state) => state.elistSaving.PhieuTietKiem);
    const location = useLocation();
    const { transaction } = location.state || {};
    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        axios.put('http://localhost:3005/api/v1/employee/saving/get-all/538104417/1')
        .then(res => {
            alert("Data update successfully!");
            navigate('../')
        })
    }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex   z-[99999]'>
        <div className="flex w-full vh-100 justify-center items-center ">
            <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
                <form >
                <div>
                    <label >Mã phiếu:</label>
                    <input value={transaction.MaPhieu} readOnly disabled className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                    onChange={e => setData({...data, MaPhieu: e.target.value})} />
                </div>
                <div>
                    <label >Số tiền gửi:</label>
                    <input value={transaction.SoTienGui} readOnly className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                    onChange={e => setData({...data, SoTienGui: e.target.value})} />
                </div>
                <div>
                    <label >Mã khách hàng:</label>
                    <input value={transaction.MaKhachHang} readOnly className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3" 
                    />
                </div>
                <div>
                    <label >Mã loại tiết kiệm:</label>
                    <input value={transaction.MaLoaiTietKiem} readOnly className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3" 
                    />
                </div>
                <div>
                    <label >Trạng thái:</label>
                    <input value={transaction.TrangThai} readOnly className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3"
                     />
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

export default Edit