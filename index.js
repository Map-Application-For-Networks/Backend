const express = require('express');
const mongoose = require('./config/db'); // Import DB connection
const markerRoutes = require('./routes/markerRoutes'); // Import routes
const tagRoutes = require('./routes/tagRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

// Use marker routes
app.use('/api', markerRoutes);
app.use('/api', tagRoutes);
app.use('/api', roleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
