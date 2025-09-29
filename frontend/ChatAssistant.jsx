import React, { useState } from 'react';

const ChatAssistant = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResponse(data.answer);
    setLoading(false);
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span>Assistant</span>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
      <div className="chat-body">
        <textarea
          className="chat-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask a question..."
        />
        <button className="btn" onClick={sendQuery} disabled={loading || !query}>
          {loading ? 'Loading...' : 'Send'}
        </button>
        {response && <div className="chat-response">{response}</div>}
      </div>
    </div>
  );
};

export default ChatAssistant;
