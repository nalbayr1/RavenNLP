import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#000000', // Black background
      padding: '20px',
      color: '#ecf0f1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Logo and Header Section */}
      <div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Image
            src="/photos/baltimore-ravens-logo-transparent.png" // Replace with the correct path
            alt="Logo"
            width={225}
            height={150}
          />
        </div>

        {/* Navigation Links with Containers */}
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
            <Link href="/logout" style={{ ...linkStyle, color: '#e74c3c' }}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer (optional) */}
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#95a5a6' }}>
        v1.0.0 {/* Optional version info */}
      </div>
    </div>
  );
};

// Styling for the containers and links
const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '18px',  // Increased font size
  display: 'block',
  padding: '10px 20px',
  transition: 'color 0.3s ease',
};

const containerStyle = {
  backgroundColor: '#22186B',  // Container background color
  marginBottom: '10px',  // Space between containers
  borderRadius: '8px',  // Rounded corners
  transition: 'background-color 0.3s ease',
};

export default Sidebar;
