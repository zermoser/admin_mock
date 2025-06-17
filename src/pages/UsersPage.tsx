import React, { useState, useMemo } from 'react';
import { User, Mail, Search } from 'lucide-react';
import Card from '../components/Card';

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
    return MOCK_USERS.filter(u =>
      u.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      u.email.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Users</h2>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                  <User size={20} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-800">{user.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-1">
                  <Mail size={16} className="text-gray-500" />
                  <span>{user.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
}
