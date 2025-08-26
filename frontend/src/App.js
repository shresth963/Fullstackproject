import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/message');
      if (!response.ok) {
        throw new Error('Failed to fetch message');
      }
      const data = await response.json();
      setMessage(data.message);
      setTimestamp(data.timestamp);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching message:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      setNewMessage('');
      fetchMessage(); // Refresh the message
    } catch (err) {
      setError(err.message);
      console.error('Error submitting message:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐳 Docker Full-Stack Application</h1>
        <p>Frontend + Backend + PostgreSQL Database</p>
      </header>

      <main className="App-main">
        <div className="message-section">
          <h2>Message from Backend</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">Error: {error}</div>
          ) : (
            <div className="message">
              <p><strong>{message}</strong></p>
              {timestamp && (
                <small>Timestamp: {new Date(timestamp).toLocaleString()}</small>
              )}
            </div>
          )}
          <button onClick={fetchMessage} className="refresh-btn">
            🔄 Refresh Message
          </button>
        </div>

        <div className="form-section">
          <h2>Add New Message</h2>
          <form onSubmit={submitMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message..."
              className="message-input"
            />
            <button type="submit" className="submit-btn">
              📝 Submit
            </button>
          </form>
        </div>

        <div className="info-section">
          <h3>Architecture</h3>
          <ul>
            <li>🎨 <strong>Frontend:</strong> React app served by Nginx</li>
            <li>⚙️ <strong>Backend:</strong> Node.js/Express API</li>
            <li>🗄️ <strong>Database:</strong> PostgreSQL with persistent storage</li>
            <li>🐳 <strong>Orchestration:</strong> Docker Compose</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
