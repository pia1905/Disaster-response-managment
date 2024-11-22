require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5001; // Change from 5000 to 5001


// Middleware to parse incoming JSON
app.use(bodyParser.json());

// Serve static files (for chatbot and images)
app.use(express.static(path.join(__dirname, '../public')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
app.post('/api/reports/submit', (req, res) => {
  const { location, description, resourcesNeeded } = req.body;
  // Save report details in the database or process them
  res.status(200).json({ message: 'Report submitted successfully!' });
});

app.post('/api/photos/upload', upload.single('photo'), (req, res) => {
  // req.file contains the photo
  res.status(200).json({ message: 'Photo uploaded successfully!', file: req.file });
});

// Chatbot interaction (placeholder logic)
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  let responseMessage = 'I am a virtual assistant. How can I assist you?';

  // Add logic to handle different message inputs
  if (message.toLowerCase().includes('help')) {
    responseMessage = 'I can assist with disaster reports, resource requests, and more!';
  }

  res.json({ message: responseMessage });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Existing code for imports and setup

// Route to handle disaster report submissions
app.post('/api/reports/submit', (req, res) => {
    const { location, description, resourcesNeeded } = req.body;
    // Handle the data (e.g., save to a database)
    res.status(200).json({ message: 'Report submitted successfully!' });
});

// Route to handle resource requests
app.post('/api/resources/request', (req, res) => {
    const { resourceType, quantity } = req.body;
    // Handle the data (e.g., save to a database)
    res.status(200).json({ message: 'Resource request submitted successfully!' });
});

// Route to handle photo uploads
app.post('/api/photos/upload', upload.single('photo'), (req, res) => {
    // req.file contains information about the uploaded file
    res.status(200).json({ message: 'Photo uploaded successfully!', file: req.file });
});

// Route to handle chatbot messages
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    let responseMessage = 'I am a virtual assistant. How can I assist you?';

    // Add logic to handle different message inputs
    if (message.toLowerCase().includes('help')) {
        responseMessage = 'I can assist with disaster reports, resource requests, and more!';
    }

    res.json({ message: responseMessage });
});

