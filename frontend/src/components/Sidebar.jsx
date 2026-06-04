import {
  ArrowLeft,
  ArrowRight,
  Beef,
  CookingPot,
  Home,
  Star,
} from 'lucide-react';
import useSidebarStore from '../stores/useSidebarStore';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <aside
      className={`h-screen bg-slate-200 text-white transition-all duration-75 ${
        isCollapsed ? 'w-14' : 'w-64'
      }`}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="rounded bg-slate-100 px-2 py-1 hover:cursor-pointer hover:bg-slate-50 hover:shadow"
        >
          {isCollapsed ? (
            <ArrowRight className="text-black" />
          ) : (
            <ArrowLeft className="text-black" />
          )}
        </button>
      </div>

      <nav className="p-2">
        <ul className="space-x-0.5">
          <Link to={'/'}>
            <li className="group rounded bg-slate-100 px-2 py-1 hover:cursor-pointer hover:bg-slate-50 hover:shadow">
              <Home className="inline align-middle text-black group-hover:text-blue-500" />
              {!isCollapsed && (
                <span className="ml-2 inline align-middle text-black select-none">
                  Home
                </span>
              )}
            </li>
          </Link>

          <Link to={'/mydish'}>
            <li className="group rounded bg-slate-100 px-2 py-1 hover:cursor-pointer hover:bg-slate-50 hover:shadow">
              <Beef className="inline align-middle text-black group-hover:text-red-500" />
              {!isCollapsed && (
                <span className="ml-2 inline align-middle text-black select-none">
                  My Dish
                </span>
              )}
            </li>
          </Link>

          <Link to={'/favorites'}>
            <li className="group rounded bg-slate-100 px-2 py-1 hover:cursor-pointer hover:bg-slate-50 hover:shadow">
              <Star className="inline align-middle text-black group-hover:text-yellow-500" />
              {!isCollapsed && (
                <span className="ml-2 inline align-middle text-black select-none">
                  Favorites
                </span>
              )}
            </li>
          </Link>

          <Link to={'/create'}>
            <li className="group rounded bg-slate-100 px-2 py-1 hover:cursor-pointer hover:bg-slate-50 hover:shadow">
              <CookingPot className="inline align-middle text-black group-hover:text-green-500" />
              {!isCollapsed && (
                <span className="ml-2 inline align-middle text-black select-none">
                  Create Recipe
                </span>
              )}
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}
