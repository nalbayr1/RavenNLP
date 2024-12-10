import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProspectList from '../components/ProspectList';

export default function Watchlist() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prospects, setProspects] = useState([]);

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

  if (!isAuthenticated) {
    return (<div>Loading...</div>);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          }}>Prospect Search</h1>

         
          <input
            type="text"
            placeholder="Search for a prospect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '98%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              backgroundColor: '#2c2c2c', 
              color: '#ecf0f1',  
            }}
          />
        </div>

        <div style={{
          flexGrow: 1, 
          overflowY: 'auto',
          backgroundColor: '#22186B', 
          padding: '10px', 
          borderRadius: '10px', 
        }}>
          <ProspectList searchQuery={searchQuery} /> 
        </div>         
      </div>
    </div>
  );
}