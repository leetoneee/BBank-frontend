import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Stepper from '../../components/ProfileCustomerStepper/Stepper';
import StepperControl from '../../components/ProfileCustomerStepper/StepperControl';
import Initialization from "../../components/ProfileCustomerStepper/steps/Initialization";
import Confirmation from "../../components/ProfileCustomerStepper/steps/Confirmation";
import Reject from "../../components/ProfileCustomerStepper/steps/Reject";
import Result from "../../components/ProfileCustomerStepper/steps/Result";
import uitPattern from '../../assets/icons/uitPattern.svg'
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PopupEdit from "../../components/Popup/PopupEdit";
import axios from '../../services/axios';
import { Link, useNavigate  } from "react-router-dom";
import { fetchAllSavingByAccount, reset } from '../../redux/employee/listSaving/listSavingSlice';
import { setPhieuTietKiem } from "../../redux/employee/listSaving/listSavingSlice";

const AAccount = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3005/api/v1/employee/saving/get-all/538104417/2')
        .then(res => {
            setRecords(res.data.transaction)
        })
    }, []);

    const handleUpdateClick = (transaction) => {
        navigate('./update', { state: { transaction } });
    };


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

    return (
        <div className="grid grid-cols-11 grid-flow-col-dense ">
            <div className="col-start-1 col-span-2">
                <UserInfo />
            </div>
            <div className="col-end-12 col-span-9 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-20">
                    <div className="w-full bg-blue-800 flex justify-center">
                        <div className="flex items-center mb-[22px]">
                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none">Tài khoản</span>
                        </div>
                    </div>
                </div>

                {/* Search & table*/}
                <div className="h-auto flex flex-col z-10 min-h-screen overflow-x-auto no-scrollbar">
                    {/* Search & button */}
                    <div className=" py-7 bg-white flex flex-row justify-between px-4">
                        <div className="relative mt-1 ">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-[20px] text-gray-500 h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                className=" focus:outline-none block p-2 pl-14 text-[25px] text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Search for items"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="text-end self-center">
                            <Link to="./creat" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-4 px-4 rounded">
                                Add +
                            </Link>
                        </div>
                    </div>

                    {/* table */}
                    <table className="w-full text-[20px] text-left text-gray-500 table ">
                        <thead className="text-[25px] text-gray-700 uppercase bg-gray-200 sticky">
                            <tr>
                                <th className="p-4">Mã phiếu</th>
                                <th>Số tiền gửi</th>
                                <th>Mã khách hàng</th>
                                <th>Mã loại tiết kiệm</th>
                                <th>Trạng thái</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className=" text-orange-600 text-[22px]">
                            {
                                records.map((d, i) => (
                                    <tr key={i} className="hover:bg-gray-100 border-b">
                                        <td className="p-3">{d.MaPhieu}</td>
                                        <td>{d.SoTienGui}</td>
                                        <td>{d.MaKhachHang}</td>
                                        <td>{d.MaLoaiTietKiem}</td>
                                        <td>{d.TrangThai}</td>
                                        <td>
                                            <button
                                                onClick={() => handleUpdateClick(d)}
                                                className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded text-lg">
                                                Update
                                            </button>
                                            <Link to="./delete" className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-lg ml-2">
                                                Delete
                                            </Link>
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

export default AAccount;