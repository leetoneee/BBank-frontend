import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Stepper from '../../components/ProfileCustomerStepper/Stepper';
import StepperControl from '../../components/ProfileCustomerStepper/StepperControl';
import Initialization from "../../components/ProfileCustomerStepper/steps/Initialization";
import Confirmation from "../../components/ProfileCustomerStepper/steps/Confirmation";
import Reject from "../../components/ProfileCustomerStepper/steps/Reject";
import Result from "../../components/ProfileCustomerStepper/steps/Result";
import uitPattern from '../../assets/icons/uitPattern.svg'
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PopupTransHis from "../../components/Popup/PopupTransHis";

const AAccount = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const data = [
        {
            name: 'Apple MacBook Pro 17"',
            color: 'Silver',
            category: 'Laptop',
            price: '$2999'
        },
        {
            name: 'Microsoft Surface Pro',
            color: 'White',
            category: 'Laptop PC',
            price: '$1999'
        },
        {
            name: 'Magic Mouse 2',
            color: 'Black',
            category: 'Accessories',
            price: '$99'
        },
        {
            name: 'Apple Watch',
            color: 'Silver',
            category: 'Accessories',
            price: '$179'
        },
        {
            name: 'iPad',
            color: 'Gold',
            category: 'Tablet',
            price: '$699'
        },
        {
            name: 'Apple iMac 27"',
            color: 'Silver',
            category: 'PC Desktop',
            price: '$3999'
        },
        {
            name: 'Apple MacBook Pro 17"',
            color: 'Silver',
            category: 'Laptop',
            price: '$2999'
        },
        {
            name: 'Microsoft Surface Pro',
            color: 'White',
            category: 'Laptop PC',
            price: '$1999'
        },
        {
            name: 'Magic Mouse 2',
            color: 'Black',
            category: 'Accessories',
            price: '$99'
        },
        {
            name: 'Apple Watch',
            color: 'Silver',
            category: 'Accessories',
            price: '$179'
        },
        {
            name: 'iPad',
            color: 'Gold',
            category: 'Tablet',
            price: '$699'
        },
        {
            name: 'Apple iMac 27"',
            color: 'Silver',
            category: 'PC Desktop',
            price: '$3999'
        },
        {
            name: 'Apple MacBook Pro 17"',
            color: 'Silver',
            category: 'Laptop',
            price: '$2999'
        },
        {
            name: 'Microsoft Surface Pro',
            color: 'White',
            category: 'Laptop PC',
            price: '$1999'
        },
        {
            name: 'Magic Mouse 2',
            color: 'Black',
            category: 'Accessories',
            price: '$99'
        },
        {
            name: 'Apple Watch',
            color: 'Silver',
            category: 'Accessories',
            price: '$179'
        },
        {
            name: 'iPad',
            color: 'Gold',
            category: 'Tablet',
            price: '$699'
        },
        {
            name: 'Apple iMac 27"',
            color: 'Silver',
            category: 'PC Desktop',
            price: '$3999'
        },
        {
            name: 'Apple MacBook Pro 17"',
            color: 'Silver',
            category: 'Laptop',
            price: '$2999'
        },
        {
            name: 'Microsoft Surface Pro',
            color: 'White',
            category: 'Laptop PC',
            price: '$1999'
        },
        {
            name: 'Magic Mouse 2',
            color: 'Black',
            category: 'Accessories',
            price: '$99'
        },
        {
            name: 'Apple Watch',
            color: 'Silver',
            category: 'Accessories',
            price: '$179'
        },
        {
            name: 'iPad',
            color: 'Gold',
            category: 'Tablet',
            price: '$699'
        },
        {
            name: 'Apple iMac 27"',
            color: 'Silver',
            category: 'PC Desktop',
            price: '$3999'
        },

    ];

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [isShowPopup, setIsShowPopup] = useState(false);
    const handleShowPopup = () => {
        setIsShowPopup(true);
    }

    return (
        <div className="grid grid-cols-11 grid-flow-col-dense ">
            <div className="col-start-1 col-span-2">
                <UserInfo />
            </div>
            <div className="col-end-12 col-span-9 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-20">
                    <div className="w-full bg-blue-800 flex justify-center">
                        <div className="flex items-center mb-[22px]">
                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none">Tài khoản</span>
                        </div>
                    </div>
                </div>

                {/* Search & table*/}
                <div className="h-auto flex flex-col z-10 min-h-screen overflow-auto no-scrollbar">
                    {/* Search */}
                    <div className=" py-7 bg-white">
                        <div className="relative mt-1 ">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-[20px] text-gray-500 h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="text" 
                                id="table-search" 
                                className=" focus:outline-none block p-2 pl-14 text-[25px] text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " 
                                placeholder="Search for items"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* table */}
                    <table className="w-full text-[20px] text-left text-gray-500 ">
                        <thead className="text-[30px] text-gray-700 uppercase bg-gray-200 sticky">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.color}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={handleShowPopup} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                        {isShowPopup &&
                                    <PopupTransHis showPopup={isShowPopup} setShowPopup={setIsShowPopup} content={item} />
                    }
                                    </td>
                                </tr>
                            ))
                            }
                            
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default AAccount;