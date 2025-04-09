import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      setTranscription(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      <div className="upload-section">
        <h2>Upload Audio File</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Transcribe'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      {transcription && (
        <div className="transcription-section">
          <h2>Transcription</h2>
          <div className="transcription-text">{transcription}</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 