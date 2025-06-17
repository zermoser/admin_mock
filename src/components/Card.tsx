import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>}
      {children}
    </div>
);
}
