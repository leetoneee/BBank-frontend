import { useDispatch, useSelector } from "react-redux";
import SelectedListbox from "../../Listbox/Listbox";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { fetchAllAccountById } from "../../../redux/customer/customerSlice";

export default function Initialization() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    const initNoiDung = () => {
        return `${(userData.first_name + ' ' + userData.last_name).toUpperCase()} chuyen tien`;
    }

    const [soTKNhan, setSoTKNhan] = useState('');
    const [soTien, setSoTien] = useState();
    const [noiDung, setNoiDung] = useState(() => initNoiDung());

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "MaKhachHang": 1
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        dispatch(fetchAllAccountById(requestOptions));
    }, []);

    const people = [
        { name: 'Wade Cooper' },
        { name: 'Arlene Mccoy' },
        { name: 'Devon Webb' },
        { name: 'Tom Cook' },
        { name: 'Tanya Fox' },
        { name: 'Hellen Schmidt' },
    ]

    return (
        <div className="flex flex-col gap-7">
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-2 gap-8">
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Tài khoản nguồn</span>
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số dư khả dụng</span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        <SelectedListbox people={people} />
                    </div>
                    <div className="col-start-2 row-start-2 col-span-2 self-center">
                        <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(userData.id)}</span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 gap-8">
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Tài khoản đích</span>
                    <input
                        className="col-start-2 col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                        value={soTKNhan}
                        onChange={(e) => setSoTKNhan(e.target.value)}
                        placeholder="Nhập tài khoản thụ hưởng" />
                </div>
            </div>

            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-3 gap-8">
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Số tiền</span>
                    <input
                        className="col-start-2 col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                        value={soTien}
                        onChange={(e) => setSoTien(e.target.value)}
                        placeholder="Nhập số tiền"
                    />

                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl  self-center ">Phí giao dịch</span>
                    <div className="col-start-2 row-start-2 self-center">
                        <input className="h-4 w-4 accent-[#73C001]" type="radio" id="html" name="hinh_thuc" value="NguoiChuyenTra" checked />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Người chuyển trả</label>
                    </div>
                    <div className="col-start-3 row-start-2 self-center">
                        <input className="h-4 w-4 accent-[#73C001] " type="radio" id="html" name="hinh_thuc" value="NguoiNhanTra" />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Người nhận trả</label>
                    </div>

                    <span className="col-start-1 row-start-3 text-[#A5ACAE] text-xl  self-center ">Nội dung</span>
                    <input
                        className="col-start-2 row-start-3 col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                        value={noiDung}
                        onChange={(e) => setNoiDung(e.target.value)}
                        maxLength={100}
                    />
                </div>
            </div>
        </div>

    )
}