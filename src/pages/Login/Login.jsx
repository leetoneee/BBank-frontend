import { useState, useEffect } from "react";
import { IoReload, IoCodeOutline } from "react-icons/io5";
import '../../fonts.css';

function Login() {
  const words = ["BBANK", "Quality", "Comes", "First"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [words.length]);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event) => {
    if (event.target.value === '') {
      setIsFocused(false);
    }
  };

  return (
    <div class="w-screen h-screen
                bg-gradient-to-br from-opacity-cde1df to-opacity-00b5ac bg-opacity-80
                block content-center relative">
      <div class="2xl:w-[1301px] 2xl:h-[711px]
                  xl:w-[867.333px] xl:h-[474px]
                  m-auto relative
                bg-white content-center
                rounded-[20px]">

        <div class="ml-[59px] inline-block
                    2xl:w-[720px] 2xl:h-[540px]">

            {/* Đổi màu viền */}
            <div className={
          (index === 0 || index === 2)
            ? "bg-gradient-to-b from-[#047AEE] to-[#9747FF] w-full h-full rounded-[15px] p-[3px]"
            : "bg-gradient-to-t from-[#047AEE] to-[#9747FF] w-full h-full rounded-[15px] p-[3px]"
        }>
              <div class="h-full w-full bg-white rounded-[20px] content-center ">
                {/* Icon và chữ thay đổi */}
                <div class=" 2xl:w-[522px] 2xl:h-[214px] m-auto flex">

                  {/* icon */}
                    <img src="./src/assets/icons/logo.svg" alt="Logo" class="2xl:w-[195px] 2xl:h-[214px] "/>

                  {/* Chữ thay đổi */}
                  <h1 class="2xl:text-[70px] 2xl:leaading-[84px] 2xl:w-[277px] 2xl:ml-[50px]
                              bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1]
                              content-center
                              text-transparent
                              bg-clip-text
                            animate-slidein">
                    {words[index]}
                  </h1>
                </div>
              </div>
            </div>
        </div>

        <div class='2xl:ml-[832px] 2xl:top-0 absolute'>

          {/* Icon và BBANK bên phải */}
          <div class='content-center flex '>
            <img src="./src/assets/icons/logo.svg" alt="Logo" class="2xl:w-[96px] 2xl:h-[105px] 2xl:mt-[25px] "/>
            <p class='bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1]
                              2xl:ml-[25px]
                              2xl:text-[70px] 2xl:w-[277px] 2xl:leading-[84px]
                              right-0
                              content-center
                              text-transparent
                              bg-clip-text'>BBANK</p>
          </div>

          {/* Username */}
          <div class="relative w-full max-w-md">
              <input type="text" id="user_name" class="2xl:mt-[32px] 2xl:w-[360px] 2xl:h-[60px] hover:cursor-pointer block font-inter-400 rounded-[10px] pl-4 py-3 text-[15px] leading-5 text-[#636363] bg-white border-[1px] border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
              <label for="user_name" class="2xl:text-[18px] absolute hover:cursor-pointer font-inter-400 pl-4 text-gray-500 duration-300 transform scale-50 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
          </div>

          {/* Password */}
          <div class="relative w-full max-w-md">
              <input type="text" id="pass" class="2xl:mt-[34px] 2xl:w-[360px] 2xl:h-[60px] hover:cursor-pointer font-inter-400 block rounded-[10px] pl-4 py-3 text-[15px] leading-5 text-[#636363] bg-white border-[1px] border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
              <label for="pass" class="2xl:text-[18px] absolute hover:cursor-pointer font-inter-400 pl-4 text-gray-500 duration-300 transform scale-50 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
          </div>

          {/* Capcha */}
          <div class="relative max-w-md ">
              <input type="text" id="capcha" class="2xl:mt-[30px] 2xl:w-[180px] 2xl:h-[60px] font-aubrey hover:cursor-pointer block rounded-[10px] pl-4 py-3 w-1/2 text-[15px] leading-5 text-[#636363] bg-white border-[1px] border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />

              <label for="capcha" class="2xl:text-[18px] absolute hover:cursor-pointer font-inter-400 pl-4 block text-gray-500 duration-300 transform scale-50 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Capcha</label>

              <h1 class="2xl:text-[30px] 2xl:left-[180px] 2xl:bottom-[12px] 2xl:ml-[20px] absolute font-aubrey text-[#9553FF] text-center ">BuoiTiu</h1>

              <button class="2xl:bottom-[15px] 2xl:right-[36px] absolute">
                <IoReload size={32} color="gray" />
              </button>
          </div>

          {/* Button Login */}
          <button class="2xl:mt-[34px] 2xl:w-[360px] 2xl:h-[60px] border font-inter-700 rounded-[10px] border-black bg-[#006FEDCC] hover:opacity-80">
            <h1 class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white 2xl:text-[22px] 2xl:font-bold text-center">Đăng nhập</h1>
          </button>

          {/* Info */}
            <p class="2xl:text-[22px] 2xl:mt-[19px] font-museo-slab-100 w-full">
              <IoCodeOutline size={24} class="inline"/> MSSV: 2252-0137-0254-0577-1487 
            </p>
          </div>   
  
      </div>
      <h1 class="text-white absolute 
                  2xl:w-[569px] 2xl:my-10 2xl:mx-[675px] 2xl:text-[70px] font
                    xl:w-[379.33px] xl:content-center xl:mx-[450px] xl:text-[50px]
                  text-center  leading-[84px]">
        © 2024 - BBANK
      </h1>
    </div>


  )
}

export default Login
