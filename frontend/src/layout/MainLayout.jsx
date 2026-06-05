import Sidebar from '../components/Sidebar';
import useSidebarStore from '../stores/useSidebarStore';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function MainLayout() {
  const { isCollapsed } = useSidebarStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="fixed top-0 left-0 z-50 hidden h-full md:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <Sidebar mobile onClose={() => setMobileOpen(false)} />
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      <main
        className={`ml-0 flex-1 transition-all duration-75 ${
          isCollapsed ? 'md:ml-14' : 'md:ml-64'
        }`}
      >
        <div className="flex items-center justify-between p-3 md:hidden">
          <button
            className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </button>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
