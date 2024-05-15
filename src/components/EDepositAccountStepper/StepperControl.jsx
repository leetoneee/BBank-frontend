import classNames from "classnames"
import React from "react"

function StepperControl({ handleClick, currentStep, steps }) {
    return (
        <div className=" container flex justify-center  mt-4 mb-8 ">
            {/* back control */}
            <button onClick={() => handleClick()}
                className={classNames(" text-2xl bg-[#475255]/[90%] text-white py-2 px-14 rounded-[10px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out ",
                    currentStep === 0 ? "hidden" : "")}>
                Quay về
            </button>
            {/* next control */}
            <button onClick={() => handleClick("next")}
                className=" ml-[72px] text-2xl bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 px-14  rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                {currentStep === 0 ? "Tiếp tục" : "Xác nhận"}
            </button>
        </div>
    )
}

export default StepperControl