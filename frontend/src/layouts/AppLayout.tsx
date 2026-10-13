import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

type AppLayoutProps = {
  title: string
  subtitle: string
}

function AppLayout({ title, subtitle }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#090b10] text-white">
      
      <Sidebar />

      <main className="flex min-w-0 flex-1 min-h-0 flex-col">
        <Topbar
            title={title}
            subtitle={subtitle}
        />

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default AppLayout;