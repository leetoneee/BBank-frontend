import { FaCircleExclamation } from "react-icons/fa6";

const PopupConfirm = ({ showPopup, setShowPopup, content }) => {
    const handleClosePopup = () => {
        setShowPopup(false); // Đóng popup bằng cách đặt lại showPopup thành false
    };

    return (
        <>
            <div className='bg-[#3C3A3A]/[50%] fixed top-0 left-0 h-screen w-screen content-center z-50'>
                <div className='2xl:w-[394px] 2xl:h-[359px] bg-white m-auto rounded-[20px] flex flex-col justify-between py-[30px]  '>
                    <FaCircleExclamation color="red" className="2xl:w-[63px] 2xl:h-[63px] mx-auto" />
                    <p className="my-[20px] mx-[45px] text-center text-[20px]">{content}</p>
                    <div className="flex flex-row justify-between mx-auto gap-20">
                        <button onClick={handleClosePopup} className="2xl:w-[110px] 2xl:h-[50px] text-[#72BF00] text-[20px] border-[#72BF00] border-[1px] rounded-[10px]">Hủy</button>

                        <button onClick={handleClosePopup} className="2xl:w-[110px] 2xl:h-[50px]
                        text-white bg-gradient-to-r from-[#52AE23] via-[#349C28] to-[#0F852E] rounded-[10px] text-[20px] 
                        hover:opacity-70">
                            Đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PopupConfirm;