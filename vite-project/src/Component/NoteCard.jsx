import React from 'react';
import { Trash2, Loader2 } from 'lucide-react';

const NoteCard = ({ title, createdAt, content, tags, onDelete, isDeleting }) => {
  const formatDate = (isoString) => {
    if (!isoString || typeof isoString !== 'string') return "Date not available";

    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 relative hover:shadow-lg transition">
      <h2 className="font-semibold text-lg mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        {formatDate(createdAt)}
      </p>
      <p className="text-gray-700 text-sm line-clamp-2">{content}</p>

      <div className="mt-2 space-x-1">
        {tags?.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-end mt-3 space-x-3 text-gray-500">
        {isDeleting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Trash2
            size={16}
            className="cursor-pointer hover:text-red-500"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default NoteCard;