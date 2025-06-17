// src/App.tsx
import React, { useState, Fragment, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ThreadsPage from './pages/ThreadsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import { Menu, Transition } from '@headlessui/react';
import { Bell, Search as SearchIcon, ChevronDown } from 'lucide-react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Derive page title from pathname
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/threads')) return 'Threads';
    if (path.startsWith('/users')) return 'Users';
    if (path.startsWith('/settings')) return 'Settings';
    return '';
  };

  const pageTitle = getPageTitle();

  // Close sidebar on route change if mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-md px-4 py-2 sm:px-6">
          <div className="flex items-center space-x-3">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page title / Breadcrumb */}
            <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
          </div>

          {/* Search + actions */}
          <div className="flex items-center space-x-4">
            {/* Notification */}
            <button className="relative text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User dropdown */}
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://zermoser.github.io/assets/images/MosProfile.jpg"
                      alt="User avatar"
                    />
                    <ChevronDown
                      className={classNames(
                        'ml-1 h-4 w-4 text-gray-600 transition-transform',
                        open ? 'rotate-180' : 'rotate-0'
                      )}
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </header>

        {/* Mobile search bar below header when toggled */}
        {showMobileSearch && (
          <div className="md:hidden bg-white px-4 pb-2 shadow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-100 p-4 sm:p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/threads" element={<ThreadsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
