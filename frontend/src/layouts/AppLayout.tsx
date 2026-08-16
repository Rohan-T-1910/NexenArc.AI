import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

function AppLayout() {
    return (
        <div>
            <Sidebar />
            <main>
                <Topbar />
            </main>
        </div>
    )
}

export default AppLayout