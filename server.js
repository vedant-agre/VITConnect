const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const connectDB = require('./backend/config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Setup
app.use(session({
    secret: 'vitconnect_secret_key_academic_project', // In production, use environment variable
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/vitconnect' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Static Folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serve uploaded images

// Routes
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/events', require('./backend/routes/eventRoutes'));

// Serve Frontend for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fallback to index.html for SPA feel (or handle 404)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
