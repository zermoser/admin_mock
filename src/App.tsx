import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ThreadsPage from './pages/ThreadsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-md p-4">
          <button
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {/* Hamburger icon */}
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
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          {/* Placeholder สำหรับ user avatar, notification etc. */}
          <div className="flex items-center space-x-4">
            <button className="relative">
              {/* Notification icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center space-x-2">
              <img src="https://i.pravatar.cc/32" alt="avatar" className="h-8 w-8 rounded-full" />
              <span className="text-gray-700 font-medium">Mos Admin</span>
            </div>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/threads" element={<ThreadsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Redirect unknown paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
);
}
