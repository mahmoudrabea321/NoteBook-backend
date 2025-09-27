import express from 'express';
import Note from './model/Note.js';  // Make sure this path is correct
const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();  // Changed from model to Note
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });  // Fixed err to error
    }
});

// Get one note
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);  // Added missing id parameter
        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create one note
router.post('/', async (req, res) => {
    try {
        const newNote = new Note({  // Changed from model to Note
            title: req.body.title,
            description: req.body.description,
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);  // Changed status to 201 for creation
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update one note (FIXED: Changed from GET to PUT/PATCH)
router.put('/:id', async (req, res) => {  // Changed from get to put
    try {
        const note = await Note.findByIdAndUpdate(  // Changed from model to Note
            req.params.id,
            req.body,
            { new: true }
        );
        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete one note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);  // Changed from model to Note
        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;