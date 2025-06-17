import React, { useState, useMemo } from 'react';
import { User, Mail, Search, CalendarClock, Tag } from 'lucide-react';
import Card from '../components/Card'; // Card เป็น light-only styling

// mock data
interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

const MOCK_USERS: MockUser[] = Array.from({ length: 25 }).map((_, idx) => ({
  id: idx + 1,
  name: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'][idx % 5],
  email: `user${idx + 1}@example.com`,
  role: ['Admin', 'Moderator', 'User'][idx % 3],
  joinedAt: new Date(Date.now() - idx * 86400000 * 3).toISOString(),
}));

export default function UsersPage() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const filtered = useMemo(() => {
    const kw = searchKeyword.toLowerCase();
    return MOCK_USERS.filter(u =>
      u.name.toLowerCase().includes(kw) ||
      u.email.toLowerCase().includes(kw) ||
      u.role.toLowerCase().includes(kw)
    );
  }, [searchKeyword]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">Users</h2>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by name, email or role..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Add User
        </button>
      </div>

      {/* Mobile: Card List */}
      <div className="sm:hidden space-y-4">
        {filtered.map(user => (
          <Card key={user.id} className="p-4">
            {/* Header row: name + joined date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Placeholder avatar: ใช้ไอคอน User */}
                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-500" />
                </div>
                <div className="truncate">
                  <p className="text-base font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <CalendarClock size={16} />
                <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>
            {/* Role row */}
            <div className="mt-3 flex items-center text-sm text-gray-700">
              <Tag size={16} className="mr-1 text-gray-500" />
              <span>{user.role}</span>
            </div>
            {/* Optional: ปุ่ม action เช่น Edit/Delete */}
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition">
                Edit
              </button>
              <button className="flex-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>

      {/* Desktop: Table */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined At</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 truncate">{user.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-1">
                  <Mail size={16} className="text-gray-500" />
                  <span className="truncate">{user.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  <div className="inline-flex space-x-2">
                    <button className="px-2 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition">Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
