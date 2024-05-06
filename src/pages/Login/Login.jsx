import { useState, useEffect } from "react";
import { IoReload, IoCodeOutline } from "react-icons/io5";
import '../../fonts.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/authentication/authSlice'
import { Loading, spinner } from "../../components/Loading/Loading";
import formatDateLogin from '../../utils/formatDateAndTime';
import classNames from "classnames";
import formatDateLogin from '../../utils/formatDateAndTime';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const words = ["BBANK", "Quality", "Comes", "First"];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [capcha, setCapcha] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [words.length]);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event) => {
    if (event.target.value === '') {
      setIsFocused(false);
    }
  };

  const handleLogin = async () => {
    if (!username) {
      alert("Please enter your username");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    const currentTime = formatDateLogin(new Date());

    let userCredentials = {
      username, password, currentTime
    }
    dispatch(login(userCredentials));
    await spinner(2000);
    navigate(`/${username}/home`, { replace: true });
  }


  return (
    <div className="relative">
      <div className="w-screen h-screen
                  bg-gradient-to-br from-opacity-cde1df to-opacity-00b5ac 
                  content-center flex justify-center flex-col pt-[120px]">
        <div className="2xl:w-[1301px] 2xl:h-[711px]
                   xl:w-[867.333px] xl:h-[474px]
                    m-auto relative
                  bg-white content-center
                  rounded-[20px] p-11">

          <div className="ml-[59px] inline-block
                      2xl:w-[720px] 2xl:h-[540px]">

            {/* Đổi màu viền */}
            <div className={
              (index === 0 || index === 2)
                ? "bg-gradient-to-b from-[#047AEE] to-[#9747FF] w-full h-full rounded-[15px] p-[3px]"
                : "bg-gradient-to-t from-[#047AEE] to-[#9747FF] w-full h-full rounded-[15px] p-[3px]"
            }>
              <div className="h-full w-full bg-white rounded-[20px] content-center ">
                {/* Icon và chữ thay đổi */}
                <div className=" 2xl:w-[522px] 2xl:h-[214px] m-auto flex">

                  {/* icon */}
                  <img src="./src/assets/icons/logo.svg" alt="Logo" className="2xl:w-[195px] 2xl:h-[214px] " />

                  {/* Chữ thay đổi */}
                  <h1 className="2xl:text-[70px] 2xl:leaading-[84px] 2xl:w-[277px] 2xl:ml-[50px]
                                bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1]
                                content-center
                                text-transparent
                                bg-clip-text
                              animate-slidein
                              font-museo-slab-500 ">
                    {words[index]}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className='2xl:ml-[832px] 2xl:top-0 absolute'>

            {/* Icon và BBANK bên phải */}
            <div className='content-center flex '>
              <img src="./src/assets/icons/logo.svg" alt="Logo" className="2xl:w-[96px] 2xl:h-[105px] 2xl:mt-[25px] " />
              <p className='bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1]
                                2xl:ml-[25px]
  2xl:text-[70px] 2xl:w-[277px] 2xl:leading-[84px]
                                right-0
                                content-center
                                text-transparent
                                bg-clip-text
                                font-museo-slab-500  '>BBANK</p>
            </div>

            {/* Username */}
            <div className="relative w-full max-w-md">
              <input type="text" id="user_name" className="2xl:mt-[32px] 2xl:w-[360px] 2xl:h-[60px] hover:cursor-pointer block font-inter-400 rounded-[10px] pl-4 py-3 text-[15px] leading-5 text-[#636363] bg-white border-[1px] border-black appearance-none focus:outline-none  peer" placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="user_name" className={`2xl:text-[18px] absolute hover:cursor-pointer font-inter-400 pl-4 text-gray-500 duration-300 transform scale-50 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                ${username ? 'text-gray-400 scale-75 -translate-y-4' : 'scale-50 top-4'
                }`}>
                Username
              </label>
            </div>
            {/* <div className="mt-[32px] w-[360px] h-[60px] grid grid-flow-row">
              <div className="grid items-center gap-x-3 border-[2px] border-black rounded-[10px] hover:cursor-pointer">
                <div className="relative">
                  <input type="text" required className="w-full p-4 bg-none text-gray-500 relative rounded-[10px] font-inter-400 peer" placeholder=" " />
                  <label htmlFor="" className={classNames("absolute left-4 top-[15px]  text-gray-500 font-inter-400 transition duration-300  origin-[0] start-2.5 peer-focus:text-gray-400 peer-focus:text-[17px] peer-focus:left-4 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100",
                    "")}>Username</label>
                </div>
              </div>
            </div> */}

            {/* Password */}
            <div className="relative w-full max-w-md">
              <input type="password" id="pass" className="2xl:mt-[34px] 2xl:w-[360px] 2xl:h-[60px] hover:cursor-pointer font-inter-400 block rounded-[10px] pl-4 py-3 text-[15px] leading-5 text-[#636363] bg-white border-[1px] border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" "
              <input type="password" id="pass" className="2xl:mt-[34px] 2xl:w-[360px] 2xl:h-[60px] hover:cursor-pointer font-inter-400 block rounded-[10px] pl-4 py-3 text-[15px] leading-5 text-[#636363] bg-white border-[1px] border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="pass" className={`2xl:text-[18px] absolute hover:cursor-pointer font-inter-400 pl-4 text-gray-500 duration-300 transform scale-50 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
                ${password ? 'text-gray-400 scale-75 -translate-y-4' : 'scale-50 top-4'
                }`}>
                Password
              </label>
            </div>

            {/* Capcha */}
            <div className="relative max-w-md ">
              <input
                type="text" id="capcha"
                className="2xl:mt-[30px] 2xl:w-[180px] 2xl:h-[60px] font-aubrey hover:cursor-pointer block rounded-[10px] pl-4 py-3 w-1/2 text-[15px] leading-5 text-[#636363] bg-white border-[1px] border-black appearance-none focus:outline-none focus:ring-0 peer"
                placeholder=" "
                value={capcha}
                onChange={(e) => setCapcha(e.target.value)} />

              <label htmlFor="capcha" className={`2xl:text-[18px] absolute hover:cursor-pointer font-inter-400 pl-4 block text-gray-500 duration-300 transform scale-50 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
                ${capcha ? 'text-gray-400 scale-75 -translate-y-4' : 'scale-50 top-4'
                }`}>
                Capcha
              </label>

              <h1 className="2xl:text-[30px] 2xl:left-[180px] 2xl:bottom-[12px] 2xl:ml-[20px] absolute font-aubrey text-[#9553FF] text-center ">BuoiTiu</h1>

              <button className="2xl:bottom-[15px] 2xl:right-[36px] absolute">
                <IoReload size={32} color="gray" />
              </button>
            </div>
            {/* Button Login */}
            <button
              className="2xl:mt-[34px] 2xl:w-[360px] 2xl:h-[60px] border font-inter-700 rounded-[10px] border-black bg-[#006FEDCC] hover:opacity-80"
              onClick={() => handleLogin()}>

              <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white 2xl:text-[22px] 2xl:font-bold text-center">Đăng nhập</h1>
            </button>

            {/* Info */}
            <p className="2xl:text-[22px] 2xl:mt-[19px] font-museo-slab-100 w-full">
              <IoCodeOutline size={24} className="inline" /> MSSV: 2252-0137-0254-0577-1487
            </p>
          </div>

        </div>
        <h1 className="text-white 
                    2xl:w-[569px] 2xl:my-10 2xl:m-auto 2xl:text-[70px]
                      xl:w-[379.33px] xl:content-center xl:mx-[450px] xl:text-[50px]
                    text-center leading-[84px] font-museo-slab-500">
          © 2024 - BBANK
        </h1>

      </div>
      <Loading />
    </div>
  )
}

export default Login