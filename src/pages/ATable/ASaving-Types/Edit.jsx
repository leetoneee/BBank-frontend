import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../../../services/axios';

function Edit() {
  const [inputData, setInputData] = useState({ MaLoaiTietKiem: '', KyHan: '', LaiSuat: '', GhiChu: '' });
  const navigat = useNavigate();
  const { MaPhieu } = useParams();
  const location = useLocation();
  const { transaction } = location.state || {};

  useEffect(() => {
    if (transaction) {
      setInputData({
        MaLoaiTietKiem: transaction.MaLoaiTietKiem,
        KyHan: transaction.KyHan,
        LaiSuat: transaction.LaiSuat,
        GhiChu: transaction.GhiChu
      });
    }
  }, [transaction]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('/saving-type/update', inputData)
      .then(res => {
        alert("Data Updated Successfully!");
        navigat(-1);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex z-[99999]'>
      <div className="flex w-full vh-100 justify-center items-center">
        <div className="w-2/5 border border-gray-300 p-5 bg-gray-100 text-[23px]">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Mã loại tiết kiệm:</label>
              <input
                value={inputData.MaLoaiTietKiem}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Kỳ hạn:</label>
              <input
                value={inputData.KyHan}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Lãi suất:</label>
              <input
                value={Math.round(inputData.LaiSuat * 1000) / 1000}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, LaiSuat: e.target.value })}
              />
            </div>
            <div>
              <label>Ghi chú:</label>
              <input
                value={inputData.GhiChu}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, GhiChu: e.target.value })}
              />
            </div>
            <br />
            <div className="flex justify-around ">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Lưu
              </button>
              <button onClick={() => navigat("../saving-types")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
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
