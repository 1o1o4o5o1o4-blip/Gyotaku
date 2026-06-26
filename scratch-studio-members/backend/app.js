const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db');
const studiosRouter = require('./routes/studios');
const membersRouter = require('./routes/members');
const shareRouter = require('./routes/share');
const batchUpdate = require('./tasks/batch-update');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize Database
db.initialize();

// Routes
app.use('/api/studios', studiosRouter);
app.use('/api/members', membersRouter);
app.use('/api/share', shareRouter);

// Serve frontend pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/members', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/members.html'));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Initialize Batch Update Task
batchUpdate.start();

module.exports = app;
