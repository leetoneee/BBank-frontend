import logo from '../../assets/icons/logo.svg'

function Header() {
    return (
        <div className="w-full bg-gradient-to-r from-[#404040]/[70%] to-[#90ADAD] pt-9 flex justify-center">
            <div className="flex items-center mb-[22px]">
                <img src={logo} alt="" className="w-[72px] mr-2" />
                <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none font-museo-slab-500">BBANK</span>
            </div>
        </div>
    )
}

export default Header