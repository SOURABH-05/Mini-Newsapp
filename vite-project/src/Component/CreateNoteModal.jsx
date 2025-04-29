import React, { useState } from 'react';
import axios from 'axios';

const CreateNoteModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/notes', {
        title,
        content,
        tags,
        createdAt: new Date().toISOString(),
      });

      onCreate(data); // send new note to parent
      setTitle('');
      setContent('');
      setTags([]);
      setTagInput('');
      onClose();
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>
          &times;
        </button>

        <h2 className="text-sm font-semibold text-gray-600 mb-1">TITLE</h2>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4 text-base"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h2 className="text-sm font-semibold text-gray-600 mb-1">CONTENT</h2>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 h-32 mb-4 text-base"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <h2 className="text-sm font-semibold text-gray-600 mb-1">TAGS</h2>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-md p-2"
            placeholder="Add tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={addTag}
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              #{tag}
              <button onClick={() => removeTag(tag)} className="text-xs font-bold">&times;</button>
            </span>
          ))}
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default CreateNoteModal;
