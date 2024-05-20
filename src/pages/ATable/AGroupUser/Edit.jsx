import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../../../services/axios';

function Edit() {
  const [inputData, setInputData] = useState({ MaNhom: '', TenNhom: ''});
  const navigat = useNavigate();
  const { MaPhieu } = useParams();
  const location = useLocation();
  const { transaction } = location.state || {};

  useEffect(() => {
    if (transaction) {
      setInputData({
        MaNhom: transaction.MaNhom,
        TenNhom: transaction.TenNhom,
      });
    }
  }, [transaction]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3005/api/v1/group/update', inputData)
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
              <label>Mã nhóm:</label>
              <input
                value={inputData.MaNhom}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Mã chức năng:</label>
              <input
                value={inputData.TenNhom}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, TenNhom: e.target.value })}
              />
            </div>
            <br />
            <div className="flex justify-around ">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Lưu
              </button>
              <button onClick={() => navigat("../group-user")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
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
