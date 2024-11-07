import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PlayerList from '../components/PlayerList';
import NewPlayerModal from '../components/NewPlayerModal'; // Import the modal

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#22186B', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column', 
        position: 'relative', // For modal background blur effect
      }}>
        {/* Container for Player Search heading and search bar */}
        <div style={{
          backgroundColor: '#000',  // Black background for the search container
          padding: '20px',
          borderRadius: '10px',
          marginRight: '10px', // Extra margin to expand to the right
          marginBottom: '30px', // Extra margin at the bottom
        }}>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '10px',
            color: '#ecf0f1',
          }}>Player Search</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for a player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              backgroundColor: '#2c2c2c',  // Dark gray background for search input
              color: '#ecf0f1',  // Light text color for better visibility
            }}
          />

          {/* New Player Button */}
          <button
            onClick={handleOpenModal}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#27ae60', // Green button
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            New Player
          </button>
        </div>

        {/* Scrollable Player List */}
        <div style={{
          flexGrow: 1, // Take available vertical space
          overflowY: 'auto', // Make it scrollable vertically
          backgroundColor: '#22186B', // Match the page background
          padding: '10px', 
          borderRadius: '10px', // Add some border radius to match styling
        }}>
          <PlayerList searchQuery={searchQuery} /> {/* Pass search query to PlayerList */}
        </div>

        {/* Modal for New Player */}
        {isModalOpen && <NewPlayerModal onClose={handleCloseModal} />} {/* Pass close handler */}
      </div>
    </div>
  );
}
