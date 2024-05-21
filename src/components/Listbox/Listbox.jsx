import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { setTaiKhoanNguon } from '../../redux/customer/transfer/transferSlice';
import { fetchAllAccountById } from '../../redux/customer/customerSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DropdownListbox() {
    const dispatch = useDispatch();

    const listAccounts = useSelector((state) => state.customer.listAccounts);
    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const userId = useSelector((state) => state.user.userId)
    // if (TaiKhoanNguon === "" && listAccounts !== "") {
    //     setSelected(listAccounts[0]);
    //     dispatch(setTaiKhoanNguon(listAccounts[0]));
    // }

    const [selected, setSelected] = useState(TaiKhoanNguon);

    const handleChooseTaiKhoan = (selected) => {
        setSelected(selected);
        dispatch(setTaiKhoanNguon(selected));
    }

    useEffect(() => {
        if (listAccounts && listAccounts.length > 0 && !TaiKhoanNguon) {
            setSelected(listAccounts[0]);
            dispatch(setTaiKhoanNguon(listAccounts[0]));
        }
    }, [listAccounts, TaiKhoanNguon, dispatch]);

    useEffect(() => {
        // let raw = {
        //     "MaKhachHang": userId
        // };

        dispatch(fetchAllAccountById());
    }, [selected]);

    return (
        <>
            {listAccounts !== "" &&
                <div className="w-full">
                    <Listbox value={selected} onChange={(selected) => handleChooseTaiKhoan(selected)}>
                        <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default rounded-[5px] bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate text-xl text-[#7AC014] font-museo-slab-100">{selected.SoTaiKhoan}</span>
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
                                    {listAccounts.map((account, accountIdx) => (
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
                                                        {account.SoTaiKhoan}
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
                </div>}
        </>

    )
}
