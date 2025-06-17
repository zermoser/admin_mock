import React, { useState, useMemo, useEffect } from 'react';
import { CalendarClock, User as UserIcon, MessageCircle, Search as SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../components/Card';
import { format, isToday } from 'date-fns';

interface Thread {
  id: number;
  title: string;
  content: string;
  author: string;
  postedAt: string;
  replies: number;
}

const THREADS: Thread[] = Array.from({ length: 37 }).map((_, i) => ({
  id: i + 1,
  title: `Thread #${i + 1}`,
  content: `Sample content for thread number ${i + 1}.`,
  author: ['Alice', 'Bob', 'Charlie', 'David'][i % 4],
  postedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 5).toISOString(),
  replies: Math.floor(Math.random() * 50),
}));

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Replies', value: 'mostReplies' },
  { label: 'Least Replies', value: 'leastReplies' },
];

export default function ThreadsPage() {
  const [search, setSearch] = useState('');
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const titles = useMemo(() => Array.from(new Set(THREADS.map(t => t.title))), []);

  const filtered = useMemo(() => {
    let arr = THREADS;
    if (search.trim()) {
      const kw = search.toLowerCase();
      arr = arr.filter(t =>
        t.title.toLowerCase().includes(kw) ||
        t.content.toLowerCase().includes(kw)
      );
    }
    if (titleFilter) arr = arr.filter(t => t.title === titleFilter);
    switch (sortBy) {
      case 'newest':
        arr = [...arr].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
      case 'oldest':
        arr = [...arr].sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
        break;
      case 'mostReplies':
        arr = [...arr].sort((a, b) => b.replies - a.replies);
        break;
      case 'leastReplies':
        arr = [...arr].sort((a, b) => a.replies - b.replies);
        break;
    }
    return arr;
  }, [search, titleFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  useEffect(() => setPage(1), [search, titleFilter, sortBy]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Threads</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-0">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search threads..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={titleFilter}
          onChange={e => setTitleFilter(e.target.value)}
          className="w-full sm:w-auto py-2 px-4 border rounded-lg"
        >
          <option value="">All Titles</option>
          {titles.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full sm:w-auto py-2 px-4 border rounded-lg"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(pageSize).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.length > 0 ? (
            pageData.map(thread => (
              <Card key={thread.id} className="relative h-full flex flex-col justify-between p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">{thread.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{thread.content}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <UserIcon size={14} />
                    <span>{thread.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarClock size={14} />
                    <span>{format(new Date(thread.postedAt), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={14} />
                    <span>{thread.replies}</span>
                  </div>
                </div>
                {isToday(new Date(thread.postedAt)) && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">NEW</span>
                )}
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-12">No threads found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="inline-block mr-1" /> Prev
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded-full ${page === idx + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-opacity-75`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Next <ChevronRight className="inline-block ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
