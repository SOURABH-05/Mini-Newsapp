import React from 'react';
import { Plus } from 'lucide-react';

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 z-50"
    >
      <Plus size={24} />
    </button>
  );
};

export default FloatingButton;
