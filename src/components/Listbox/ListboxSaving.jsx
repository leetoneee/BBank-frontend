import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { setPhieuTietKiem } from '../../redux/customer/listSaving/listSavingSlice';
import { fetchAllSavingByAccount, reset } from '../../redux/customer/listSaving/listSavingSlice';
import { useDispatch, useSelector } from 'react-redux';

const ListboxSaving = () => {
    const dispatch = useDispatch();

    const listSavings = useSelector((state) => state.listSaving.listSavings);
    const PhieuTietKiem = useSelector((state) => state.listSaving.PhieuTietKiem);
    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);

    const [selected, setSelected] = useState(PhieuTietKiem);

    const handleChooseSaving = (selected) => {
        setSelected(selected);
        dispatch(setPhieuTietKiem(selected)); 
    }

    // useEffect(() => {
    //     if (listSavings && listSavings.length > 0 && !PhieuTietKiem) {
    //         setSelected(listSavings[0]);
    //         dispatch(setPhieuTietKiem(listSavings[0]));
    //     }
    // }, [listSavings, PhieuTietKiem, dispatch]);

    useEffect(() => {
        dispatch(fetchAllSavingByAccount(TaiKhoanNguon.SoTaiKhoan));
    }, []);
    
    useEffect(() => {
        // Gọi API fetchAllSavingByAccount khi TaiKhoanNguon thay đổi
        if (TaiKhoanNguon) {
            dispatch(reset());
          dispatch(fetchAllSavingByAccount(TaiKhoanNguon.SoTaiKhoan));
          setSelected(PhieuTietKiem);
        }
      }, [ TaiKhoanNguon, dispatch]);

    return (
        <>
            
                <div className="w-full">
                    <Listbox value={selected} onChange={(selected) => handleChooseSaving(selected)}>
                        <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default rounded-[5px] bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            {
                                    selected && listSavings ?
                                        (
                                            <span className="block truncate text-xl text-[#7AC014] font-museo-slab-100">{selected.MaPhieu}</span>
                                        )
                                        : (
                                            <span className="block truncate text-xl text-gray-400 ">
                                                Chọn phiếu tiết kiệm
                                            </span>
                                        )

                                }
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>  
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20">
                                    {listSavings && listSavings.map((account, accountIdx) => (
                                        <Listbox.Option
                                            key={accountIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={account}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={` text-xl text-black font-museo-slab-100 block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {account.MaPhieu}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute font-museo-slab-100 inset-y-0 left-0 flex items-center pl-3 text-[#7AC014]">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
        </>

    )
}
export default ListboxSaving;