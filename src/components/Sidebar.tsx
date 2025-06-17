import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Users, Settings } from 'lucide-react';

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

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 transform md:translate-x-0 transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <span className="text-white text-lg font-semibold">Admin</span>
        </div>
        <nav className="mt-4">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-100 ${
                  active ? 'bg-blue-200 font-semibold' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
);
}
