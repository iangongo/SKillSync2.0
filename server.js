const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample API endpoint to handle skill data
app.get('/api/skills', (req, res) => {
    const skills = [
        { id: 1, name: 'JavaScript', progress: 75 },
        { id: 2, name: 'React', progress: 60 },
        { id: 3, name: 'Node.js', progress: 50 },
    ];
    res.json(skills);
});

// Root route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

