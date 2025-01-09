const express = require('express');
const cors = require('cors'); // Import CORS middleware
const mongoose = require('./config/db'); // Import DB connection
const markerRoutes = require('./routes/markerRoutes'); // Import routes
const tagRoutes = require('./routes/tagRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
const PORT = 3001;

// Enable CORS for all requests (can restrict it to specific origins if needed)
app.use(cors());

// To restrict CORS to specific origin (like your React app):
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

// Use marker routes
app.use('/api', markerRoutes);
app.use('/api', tagRoutes);
app.use('/api', roleRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
