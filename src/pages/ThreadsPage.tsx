import React from 'react';

const mockThreads = [
  { id: 1, title: 'Thread One', content: 'This is the first thread' },
  { id: 2, title: 'Thread Two', content: 'This is the second thread' },
  { id: 3, title: 'Thread Three', content: 'This is the third thread' },
];

export default function ThreadsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Threads</h2>
      <div className="space-y-4">
        {mockThreads.map((thread) => (
          <div key={thread.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{thread.title}</h3>
            <p className="text-gray-600">{thread.content}</p>
          </div>
        ))}
      </div>
    </div>
);
}
