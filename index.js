const express = require('express');
const cors = require('cors'); // Import CORS middleware
const mongoose = require('./config/db'); // Import DB connection
const markerRoutes = require('./routes/markerRoutes'); // Import routes
const tagRoutes = require('./routes/techTagRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const modelRoutes = require('./routes/modelTagRoutes');
const expertiseRoutes = require('./routes/expertiseTagRoutes');

const app = express();
const PORT = 3001;

// Enable CORS for specific origin
app.use(
  cors({
    origin: ["https://frontend-indol-kappa-59.vercel.app"], // Correctly pass origin as an array
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Specify allowed methods
    credentials: true // Allow cookies if needed
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Use marker routes
app.use('/api', markerRoutes);
app.use('/api', tagRoutes);
app.use('/api', roleRoutes);
app.use('/api', userRoutes);
app.use('/api', modelRoutes);
app.use('/api', expertiseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
