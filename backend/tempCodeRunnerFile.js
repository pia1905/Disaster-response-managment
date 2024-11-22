// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/disasterDB', {
  // Removed deprecated options
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => console.log(err));

// Incident Schema
const incidentSchema = new mongoose.Schema({
  description: String,
  lat: String,
  lng: String,
});

const Incident = mongoose.model('Incident', incidentSchema);

// Routes
app.post('/api/report', async (req, res) => {
  const { description, lat, lng } = req.body;
  const newIncident = new Incident({ description, lat, lng });
  await newIncident.save();
  res.json(newIncident);
});

app.get('/api/incidents', async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

// Start Server
const PORT = 5001;  // Change to a different port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// frontend/src/components/IncidentForm.js
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/report', report); // Updated port
      alert('Incident reported successfully!');
      setReport({ description: '', lat: '', lng: '' });
    } catch (error) {
      console.error(error);
    }
  };
  