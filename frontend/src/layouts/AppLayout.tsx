import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

function AppLayout() {
    return (
        <div className="flex min-h-screen bg-[#090b10] text-white">
            <Sidebar />
            <main className="flex min-w-0 flex-1 flex-col">
                <Topbar />
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AppLayout