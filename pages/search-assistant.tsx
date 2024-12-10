// pages/search-assistant.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

interface Message {
  user: boolean;
  text: string;
}

export default function SearchAssistant() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
  
    // Add only the user message to the chat
    setMessages((prev) => [...prev, { user: true, text: input }]);
  
    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { user: false, text: `AI response for: ${input}` }]);
    }, 500); // Simulated delay for AI response
  
    setInput(''); // Clear input field
  };
  

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div
        style={{
          flexGrow: 1,
          padding: '20px',
          backgroundColor: '#22186B',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#000',
            padding: '20px',
            borderRadius: '10px',
            marginRight: '10px',
            marginBottom: '30px',
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              marginBottom: '10px',
              color: '#ecf0f1',
            }}
          >
            Search Assistant
          </h1>
          <p style={{ fontSize: '1rem', color: '#ecf0f1' }}>
            Interact with the assistant to get responses in real time.
          </p>
        </div>

        {/* Chat Section */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#000',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: '10px',
                textAlign: msg.user ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: msg.user ? '#27ae60' : '#34495e',
                  color: '#fff',
                  maxWidth: '70%',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div
          style={{
            display: 'flex',
            padding: '10px',
            backgroundColor: '#2c2c2c',
            borderRadius: '10px',
            marginTop: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flexGrow: 1,
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '1rem',
              backgroundColor: '#fff',
              marginRight: '10px',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: '10px 20px',
              backgroundColor: '#27ae60',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
