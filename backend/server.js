const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const otpRoutes = require('./Routes/otpRoutes');
const phoneNumberRoutes = require('./Routes/phoneNumberRoutes');
const contactRoutes = require('./Routes/contactRoutes');
require('dotenv').config(); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const mongoUri = process.env.MONGO_URI; // Replace with your MongoDB Atlas connection string
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Use the routes
app.use('/api1', otpRoutes);
app.use('/api2', phoneNumberRoutes);
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});