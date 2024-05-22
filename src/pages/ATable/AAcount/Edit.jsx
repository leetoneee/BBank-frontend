import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../services/axios';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { formatDateResult, formatDateSaving } from "../../../utils/formatDateAndTime";

function Edit() {

    const navigat = useNavigate();
    const {MaPhieu} = useParams();
    const [data, setData] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const PhieuTietKiem = useSelector((state) => state.elistSaving.PhieuTietKiem);
    const location = useLocation();
    const { transaction } = location.state || {};
    const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex   z-[99999]'>
        <div className="flex w-full vh-100 justify-center items-center ">
            <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
                <form >
                <div>
                    <label >Số tài khoản:</label>
                    <input value={transaction.SoTaiKhoan} readOnly disabled className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"/>
                </div>
                <div>
                    <label >Mã khách hàng:</label>
                    <input value={transaction.MaKhachHang} readOnly disabled className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white" />
                </div>
                <div>
                    <label >Loại tài khoản:</label>
                    <input value={transaction.LoaiTaiKhoan} readOnly disabled className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"/>
                </div>
                <div>
                    <label >Số dư:</label>
                    <input value={formatToVND(transaction.SoDu)} readOnly disabled className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"/>
                </div>
                <div>
                    <label >Ngày mở:</label>
                    <input value={formatDateResult(transaction.NgayMo)} readOnly disabled className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"/>
                </div>
                <div>
                    <label >Trạng thái:</label>
                    <input value={transaction.TrangThai ? 'Mở' : 'Đóng'} readOnly disabled className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"/>
                </div>
                <br />
                <div className="flex justify-center">
                    <button onClick={() => navigat("../accounts")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                        Thoát
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit