// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
  { name: 'Threads', path: '/threads', icon: <MessageCircle size={20} /> },
  { name: 'Users', path: '/users', icon: <Users size={20} /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  // width class based on collapsed
  const baseWidthClass = collapsed ? 'w-20' : 'w-64';

  return (
    <>
      {/* Overlay บน mobile เมื่อ sidebarOpen */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-30 bg-white shadow-lg transform transition-transform duration-200
          md:relative md:translate-x-0
          ${baseWidthClass}
        `}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between h-16 bg-blue-600 px-4">
          {!collapsed ? (
            <span className="text-white text-lg font-semibold">Admin Panel</span>
          ) : (
            <span className="text-white text-lg font-semibold">AP</span>
          )}
          <div className="flex items-center space-x-1">
            {/* ปุ่ม collapse บน desktop */}
            <button
              className="hidden md:flex text-white focus:outline-none"
              onClick={toggleCollapse}
              aria-label="Toggle collapse sidebar"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            {/* ปุ่มปิดบน mobile */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-4 overflow-y-auto">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors
                  ${active ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                  ${collapsed ? 'justify-center' : ''}
                `}
                onClick={() => setSidebarOpen(false)} // ปิด sidebar บน mobile เมื่อคลิก
              >
                <span className={`${active ? 'text-blue-600' : 'text-gray-500'}`}>
                  {link.icon}
                </span>
                {!collapsed && <span className="ml-3">{link.name}</span>}
                {active && !collapsed && (
                  <span className="ml-auto inline-block w-1 h-6 bg-blue-600 rounded-r-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div className="p-4 border-t border-gray-200">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <img
                src="https://zermoser.github.io/assets/images/MosProfile.jpg"
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="truncate">
                <p className="text-gray-800 text-sm font-medium">Mos Admin</p>
                <p className="text-gray-500 text-xs truncate">admin@example.com</p>
              </div>
            </div>
          ) : (
            <img
              src="https://zermoser.github.io/assets/images/MosProfile.jpg"
              alt="avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
}
