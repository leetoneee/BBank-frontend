import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from '../../../services/axios';
import { Link, useNavigate } from "react-router-dom";
import formatToVND from "../../../utils/formatToVND";
import { formatDateResult, formatDateSaving } from "../../../utils/formatDateAndTime";

const AGroupUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    useEffect(() => {
        axios.get('/group/get-all')
            .then(res => {
                setRecords(res.data.listRole)
            })
    }, []);

    const handleUpdateClick = (transaction) => {
        navigate('./update', { state: { transaction } });
    };

    const filteredData =
        searchTerm === ''
            ? records
            : records.filter((record) => {
                return record?.TenNhom.toLowerCase().includes(searchTerm.toLowerCase())
            })

    // const filteredData = data.filter(item =>
    //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const [isShowPopup, setIsShowPopup] = useState(false);
    const handleShowPopup = () => {
        setIsShowPopup(true);
    }

    // const handleUpdateClick = (transaction) => {
    //     setSelectedTransaction(transaction);
    // };

    const handleDelete = (MaNhom) => {
        const conf = window.confirm("Do you want to delete?");
        if (conf) {
            axios.post('/group/delete', { MaNhom })
                .then(res => {
                    alert("Data Deleted Successfully!");
                    navigate('/admin/group-user');
                    axios.get('/group/get-all')
                        .then(res => {
                            setRecords(res.data.listRole)
                        });
                }).catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div className="col-end-12 col-span-9 flex flex-col">
                {/* Header */}
                <div className="sticky h-20 top-0 z-10">
                    <div className="w-full bg-blue-800 flex justify-center">
                        <div className="flex items-center mb-[22px]">
                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none font-bold">NHÓM NGƯỜI DÙNG</span>
                        </div>
                    </div>
                </div>

                {/* Search & table*/}
                <div className="h-auto flex flex-col min-h-screen  no-scrollbar">
                    {/* Search & button */}
                    <div className=" h-[90px] py-4 bg-white flex flex-row justify-between px-4 sticky top-20 z-10 ">
                        <div className="relative mt-1 ">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-[20px] text-gray-500 h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                className=" focus:outline-none block p-2 pl-14 text-[25px] text-gray-900 border border-gray-300 rounded-lg w-[400px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Tìm kiếm theo Tên nhóm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="text-end self-center">
                            <Link to="./create" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-4 px-4 rounded">
                                Add +
                            </Link>
                        </div>
                    </div>

                    {/* table */}
                    <table className="w-full text-left text-gray-500 table">
                        <thead className="text-[23px] text-gray-700 uppercase bg-gray-200 sticky top-[170px] z-10 ">
                            <tr>
                                <th className="p-4">Mã nhóm</th>
                                <th>Tên nhóm</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className=" text-orange-600 text-[22px]">
                            {
                                filteredData.map((d, i) => (
                                    <tr key={i} className="hover:bg-gray-400 border-b">
                                        <td className="p-3">{d.MaNhom}</td>
                                        <td>{d.TenNhom}</td>
                                        <td>
                                            <button
                                                onClick={() => handleUpdateClick(d)}
                                                className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded text-lg">
                                                Xem
                                            </button>
                                            <button onClick={() => handleDelete(d.MaNhom)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-lg ml-2">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AGroupUser;