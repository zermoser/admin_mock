import { useState, useMemo } from 'react';
import { User, Mail, Search, CalendarClock, Tag, Edit2, Trash2 } from 'lucide-react';
import Card from '../components/Card';

// mock data
interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}


const dateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

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
      <div className="hidden sm:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-full table-auto">
            <thead className="sticky top-0 bg-gray-50 z-20">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Joined At</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(user => (
                  <tr
                    key={user.id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-shadow"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={16} className="text-gray-500" />
                        </div>
                        <span className="font-medium text-gray-800 truncate">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Mail size={16} className="text-gray-500" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{new Date(user.joinedAt).toLocaleDateString('en-US', dateOptions)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center whitespace-nowrap">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          className="p-2 hover:bg-green-100 rounded-lg transition"
                          title="Edit"
                          aria-label="Edit user"
                        >
                          <Edit2 size={14} className="text-green-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-red-100 rounded-lg transition"
                          title="Delete"
                          aria-label="Delete user"
                        >
                          <Trash2 size={14} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
