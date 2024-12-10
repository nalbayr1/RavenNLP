import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#000000',
      padding: '20px',
      color: '#ecf0f1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      
      <div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Image
            src="/photos/baltimore-ravens-logo-transparent.png" 
            alt="Logo"
            width={225}
            height={150}
          />
        </div>

        
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={containerStyle}>
            <Link href="/dashboard" style={linkStyle}>
              Player Search
            </Link>
          </li>
          <li style={containerStyle}>
            <Link href="/team-search" style={linkStyle}>
              Team Search
            </Link>
          </li>
          <li style={containerStyle}>
            <Link href="/watchlist" style={linkStyle}>
              Your Watchlist
            </Link>
          </li>
          <li style={containerStyle}>
            <Link href="/prospects" style={linkStyle}>
              Draft Prospects
            </Link>
          </li>
          <li style={containerStyle}>
            <Link href="/logout" style={{ ...linkStyle, color: '#e74c3c' }}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>

      
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#95a5a6' }}>
        v1.0.0 
      </div>
    </div>
  );
};


const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '18px', 
  display: 'block',
  padding: '10px 20px',
  transition: 'color 0.3s ease',
};

const containerStyle = {
  backgroundColor: '#22186B',  
  marginBottom: '10px',  
  borderRadius: '8px',  
  transition: 'background-color 0.3s ease',
};

export default Sidebar;
