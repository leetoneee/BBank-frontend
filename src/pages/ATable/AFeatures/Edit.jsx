import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../../../services/axios';

function Edit() {
  const [inputData, setInputData] = useState({ MaChucNang: '', TenChucNang: '', Url: '' });
  const navigat = useNavigate();
  const { MaPhieu } = useParams();
  const location = useLocation();
  const { transaction } = location.state || {};

  useEffect(() => {
    if (transaction) {
      setInputData({
        MaChucNang: transaction.MaChucNang,
        TenChucNang: transaction.TenChucNang,
        Url: transaction.Url
      });
    }
  }, [transaction]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3005/api/v1/role/update', inputData)
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
              <label>Mã chức năng:</label>
              <input
                value={inputData.MaChucNang}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                readOnly
              />
            </div>
            <div>
              <label>Tên chức năng:</label>
              <input
                value={inputData.TenChucNang}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, TenChucNang: e.target.value })}
              />
            </div>
            <div>
              <label>Url:</label>
              <input
                value={inputData.Url}
                className="border border-gray-300 mt-1 block w-full rounded outline-none py-2 pl-3 bg-white"
                onChange={e => setInputData({ ...inputData, Url: e.target.value })}
              />
            </div>
            <br />
            <div className="flex justify-around ">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]">
                Lưu
              </button>
              <button onClick={() => navigat("../features")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px]">
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