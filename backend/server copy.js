// src/components/IncidentForm.js
import React, { useState } from 'react';
import axios from 'axios';

function IncidentForm() {
  const [report, setReport] = useState({
    description: '',
    lat: '',
    lng: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/report', report);
      alert('Incident reported successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Report an Incident</h3>
      <input
        type="text"
        name="description"
        placeholder="Describe the incident"
        value={report.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lat"
        placeholder="Latitude"
        value={report.lat}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lng"
        placeholder="Longitude"
        value={report.lng}
        onChange={handleChange}
      />
      <button type="submit">Submit Report</button>
    </form>
  );
}

export default IncidentForm;
// src/components/Map.js
import React from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';

function Map({ incidents }) {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 28.7041, lng: 77.1025 }}>
      {incidents.map(incident => (
        <Marker
          key={incident._id}
          position={{ lat: parseFloat(incident.lat), lng: parseFloat(incident.lng) }}
        />
      ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapComponent({ incidents }) {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WrappedMap
        incidents={incidents}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
// src/App.js
import React, { useState, useEffect } from 'react';
import IncidentForm from './components/IncidentForm';
import MapComponent from './components/Map';
import axios from 'axios';

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const res = await axios.get('http://localhost:5000/api/incidents');
      setIncidents(res.data);
    };
    fetchIncidents();
  }, []);

  return (
    <div>
      <IncidentForm />
      <MapComponent incidents={incidents} />
    </div>
  );
}

export default App;
