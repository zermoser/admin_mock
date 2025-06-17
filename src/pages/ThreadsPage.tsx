import React, { useState, useMemo } from 'react';
import { CalendarClock, User, MessageCircle, Search } from 'lucide-react';
import Card from '../components/Card';

interface MockThread {
  id: number;
  title: string;
  content: string;
  author: string;
  postedAt: string;
  replies: number;
}

const MOCK_THREADS: MockThread[] = Array.from({ length: 37 }).map((_, idx) => ({
  id: idx + 1,
  title: `Sample Thread ${idx + 1}`,
  content: `This is a sample content for thread number ${idx + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  author: ['Alice', 'Bob', 'Charlie', 'David'][idx % 4],
  postedAt: new Date(Date.now() - (idx * 3600 * 1000 * 5)).toISOString(),
  replies: Math.floor(Math.random() * 50),
}));

export default function ThreadsPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const filtered = useMemo(() => {
    return MOCK_THREADS.filter(thread =>
      thread.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Threads</h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search threads..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchKeyword}
            onChange={e => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Thread cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map(thread => (
          <Card key={thread.id}>
            <h3 className="text-lg font-semibold text-blue-700 mb-2 line-clamp-2">{thread.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{thread.content}</p>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{thread.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarClock size={16} />
                <span>{new Date(thread.postedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={16} />
                <span>{thread.replies} replies</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
);
}
