import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function Watchlist() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          }}>Your Watchlist</h1>
        </div>
      </div>
    </div>
  );
}
