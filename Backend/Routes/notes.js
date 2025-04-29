import express from 'express';
import Note from '../Model/Note.js';

const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const note = new Note({ title, content, tags });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});

// Get all notes (sorted by createdAt descending)
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

export default router;
