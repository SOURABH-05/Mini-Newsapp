import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from './NoteCard';
import CreateNoteModal from '../Component/CreateNoteModal';
import FloatingButton from '../Component/FloatingButton';

const NoteGrid = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getnotes');
        setNotes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Create note
  const handleCreateNote = (note) => {
    setNotes([note, ...notes]);
  };

  // Delete note
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        setDeletingId(noteId);
        await axios.delete(`http://localhost:5000/deletnote/${noteId}`);
        setNotes(notes.filter(note => note._id !== noteId));
      } catch (err) {
        setError('Failed to delete note');
        console.error(err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) return <div>Loading notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative p-6">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note) => (
          <NoteCard 
            key={note._id}
            title={note.title}
            createdAt={note.createdAt}
            content={note.content}
            tags={note.tags}
            onDelete={() => handleDeleteNote(note._id)}
            isDeleting={deletingId === note._id}
          />
        ))}
      </div>

      <FloatingButton onClick={() => setIsModalOpen(true)} />
      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateNote}
      />
    </div>
  );
};

export default NoteGrid;