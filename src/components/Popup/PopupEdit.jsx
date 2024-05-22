
const PopupEdit = ({ showPopup, setShowPopup, content, handleClickComfirm }) => {
    const handleClosePopup = () => {
        setShowPopup(false); // Đóng popup bằng cách đặt lại showPopup thành false
    };

    return (
        <>
            <div className='bg-[#3C3A3A]/[2%] fixed top-0 left-0 h-screen w-screen flex  justify-center items-center z-[99999]'>
                <div className='h-auto w-full max-w-[1000px] bg-white m-auto rounded-[20px] flex flex-col justify-between  '>
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-3 grid-rows-1">
                            <span className="col-start-1 text-black text-[30px] p-3 self-center ">
                                Tên người thụ hưởng
                            </span>
                        </div>
                        <div className="border-b-2 border-b-gray-300 h-[1px] w-full self-center"></div>
                        <div className="flex flex-row gap-12     mx-auto">
                            <button onClick={handleClosePopup} className="2xl:w-[110px] 2xl:h-[50px] text-[#72BF00] text-[20px] border-[#72BF00] border-[1px] rounded-[10px]">
                                Hủy
                            </button>

                            <button onClick={() => handleClickComfirm()} className="2xl:w-[110px] 2xl:h-[50px]
                            text-white bg-gradient-to-r from-[#52AE23] via-[#349C28] to-[#0F852E] rounded-[10px] text-[20px] 
                            hover:opacity-70">
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PopupEdit;