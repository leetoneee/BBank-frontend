import { FaCircleExclamation } from "react-icons/fa6";

const PopupNotice = ({ showPopup, setShowPopup, content}) => {
    const handleClosePopup = () => {
        setShowPopup(false); // Đóng popup bằng cách đặt lại showPopup thành false
    };

    return (
        <>
            <div className='bg-[#3C3A3A]/[50%] fixed top-0 left-0 h-screen w-screen content-center'>
                <div className='2xl:w-[394px] 2xl:h-[359px] bg-white m-auto rounded-[20px] flex flex-col '>
                    <FaCircleExclamation color="red" className="2xl:w-[63px] 2xl:h-[63px] mx-auto mt-[30px]" />
                    <p className="my-[20px] mx-[45px] text-center text-[20px]">{content}</p>
                    <button onClick={handleClosePopup} className="2xl:w-[110px] 2xl:h-[50px]
                    text-white text-[20px] bg-gradient-to-r from-[#52AE23] via-[#349C28] to-[#0F852E] mx-auto rounded-[10px]
                    hover:opacity-70">
                        Đóng
                    </button>
                </div>
            </div>
        </>
    )
};

export default PopupNotice;