import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/icons/logo.svg'
import { FaCircleExclamation } from "react-icons/fa6";
import { reset as resetProfile } from '../../../redux/employee/createCustomerProfile/createCustomerProfileSlice';
import { reset as resetTransfer } from "../../../redux/customer/transfer/transferSlice";
import { reset as resetCheckAccount } from "../../../redux/system/checkAccountExist/checkAccountExistSlice";
import { useDispatch, useSelector } from "react-redux";

function Reject(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const message = useSelector((state) => state.createProfile.message)

    const handleNavigateHome = () => {
        dispatch(resetProfile());
        navigate('../home', { replace: true })
    }

    const handleInitNewTransaction = () => {
        dispatch(resetProfile());
        props.handleInitNewTransaction();
    }

    return (
        <div className=" container flex flex-col gap-[50px] mt-4 mb-8 ">
            <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-10 px-10 gap-4 shadow-rose-400 shadow-sm">
                <div className="flex justify-center items-center">
                    <div className="flex items-center">
                        <img src={logo} alt="" className="w-[72px] mr-2" />
                        <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none font-museo-slab-500">BBANK</span>
                    </div>
                </div>

                <FaCircleExclamation color="red" className="w-[90px] h-[90px] mx-auto" />
                <span className="text-white font-bold text-[25px] self-center ">LẬP HỒ SƠ KHÁCH HÀNG THẤT BẠI</span>
                {!message && <span className="text-white text-xl text-center self-center whitespace-normal w-96    ">
                    Xin lỗi quý khách, kết nối tới hệ thống tạm thời gian đoạn. Vui lòng thử lại sau.
                </span>}
            </div>

            {message && 
                <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-10 px-10 gap-4 shadow-rose-400 shadow-sm">

                    {message.map((error, index) => (
                        <div key={index} >
                            <div className="grid grid-cols-3 gap-8">
                                <span className="col-start-1 text-[#A5ACAE] text-xl self-center">
                                    Error {index + 1}
                                </span>
                                <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col">
                                    <span className="text-xl font-bold">
                                        {error}
                                    </span>
                                </div>
                            </div>
                            <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                        </div>
                    ))}
                </div>
            }


            <div className=" container flex justify-around " >
                {/* back control */}
                <button onClick={() => handleNavigateHome()}
                    className={classNames(" text-2xl bg-[#475255]/[90%] text-white py-2 w-52   rounded-[10px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out ")}>
                    Quay về
                </button>

                {/* new transaction */}
                <button onClick={() => handleInitNewTransaction()}
                    className="text-2xl self-center  bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 w-96   rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                    Thêm khách hàng mới
                </button>
            </div>
        </div >
    )
}

export default Reject;