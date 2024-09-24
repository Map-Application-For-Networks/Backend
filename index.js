const express = require('express');
const mongoose = require('./config/db'); // Import DB connection
const markerRoutes = require('./routes/addMarkerRoutes'); // Import routes

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

// Use marker routes
app.use('/api', markerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
