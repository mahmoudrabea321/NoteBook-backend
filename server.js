import mongoose from 'mongoose';  // Removed redundant { Mongoose }
import express from 'express';
import router from './router.js';
import dotenv from 'dotenv';
import cors from 'cors'
// Load environment variables
dotenv.config();
const app = express();

// Database connection
mongoose.connect(process.env.DATABASE_URL)  // Fixed hyphen to underscore
  .then(() => console.log('Connecting to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Database connection error:', error);
});
db.once('open', () => {
  console.log('Successfully connected to database');
});

// Middleware
app.use(cors({
  origin: '*' 
}));


app.use(express.json());

// Routes
app.use('/api/notes', router);  // Added /api prefix for better structure

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});