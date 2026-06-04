import Sidebar from '../components/Sidebar';
import useSidebarStore from '../stores/useSidebarStore';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="fixed top-0 left-0 z-50 h-full">
        <Sidebar />
      </div>

      <main
        className={`flex-1 transition-all duration-75 ${
          isCollapsed ? 'ml-14' : 'ml-64'
        }`}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
