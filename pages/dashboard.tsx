import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PlayerList from '../components/PlayerList';
import NewPlayerModal from '../components/NewPlayerModal'; 

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        position: 'relative', 
      }}>
        
        <div style={{
          backgroundColor: '#000',  
          padding: '20px',
          borderRadius: '10px',
          marginRight: '10px', 
          marginBottom: '30px', 
        }}>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '10px',
            color: '#ecf0f1',
          }}>Player Search</h1>

         
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
              backgroundColor: '#2c2c2c', 
              color: '#ecf0f1',  
            }}
          />

         
          <button
            onClick={handleOpenModal}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#27ae60', 
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

       
        <div style={{
          flexGrow: 1, 
          overflowY: 'auto',
          backgroundColor: '#22186B', 
          padding: '10px', 
          borderRadius: '10px', 
        }}>
          <PlayerList searchQuery={searchQuery} /> 
        </div>

        
        {isModalOpen && <NewPlayerModal onClose={handleCloseModal} />} 
      </div>
    </div>
  );
}
