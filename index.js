const express = require('express');
const cors = require('cors'); // Import CORS middleware
const mongoose = require('./config/db'); // Import DB connection
const markerRoutes = require('./routes/markerRoutes'); // Import routes
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const organismRoutes = require('./routes/organismTagRoutes');
const drivenProcessTagRoutes = require('./routes/drivenProcessTagRoutes');
const classOfExRnaTagRoutes = require('./routes/classOfExRnaTagRoutes');
const carrierOfExRnaTagRoutes = require('./routes/carrierOfExRnaTagRoutes');
const applicationAreaTagRoutes = require('./routes/applicationAreaTagRoutes');
const researchExpertiseRoutes = require('./routes/researchExpertiseTagRoutes');
const techExpertiseRoutes = require('./routes/techExpertiseTagRoutes');


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
app.use('/api', roleRoutes);
app.use('/api', userRoutes);
app.use('/api', organismRoutes);
app.use('/api', drivenProcessTagRoutes);
app.use('/api', classOfExRnaTagRoutes);
app.use('/api', carrierOfExRnaTagRoutes);
app.use('/api', applicationAreaTagRoutes);
app.use('/api', researchExpertiseRoutes);
app.use('/api', techExpertiseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
