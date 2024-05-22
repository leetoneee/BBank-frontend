import { Outlet } from "react-router-dom";
import React from 'react'
import ASidebar from "../components/Sidebar/ASidebar";
import AHeader from "../components/Header/AHeader";

function AdminLayout() {
    return (
        <div className="bg-neutral-100 h-screen w-screen flex flex-row overflow-hidden">
            <ASidebar/>
            <div className="flex flex-col flex-1">
                <AHeader />
                <div className="flex-1 min-h-0 px-4 overflow-scroll overflow-x-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout