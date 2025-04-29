import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import notesRoute from './Routes/notes.js';

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/notes', notesRoute);
app.use('/getnotes', notesRoute);
app.use('/deletnote', notesRoute);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI); // Clean and modern
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};


// Start Server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
