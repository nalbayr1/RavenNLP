// pages/watchlist.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PlayerList from '../components/PlayerList';

export default function Watchlist() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favoritePlayers, setFavoritePlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchFavoritePlayers = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await fetch(`/api/users/${userId}/favorites`);
          if (!res.ok) {
            throw new Error(`Failed to fetch favorite players: ${res.statusText}`);
          }
          const data = await res.json();
          setFavoritePlayers(data);
        } catch (error) {
          console.error('Error fetching favorite players:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchFavoritePlayers();
  }, []);

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
        }}
      >
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
            Your Watchlist
          </h1>
        </div>
        {loading ? (
          <div>Loading favorite players...</div>
        ) : favoritePlayers.length > 0 ? (
          <PlayerList players={favoritePlayers} />
        ) : (
          <div>You have no favorite players yet.</div>
        )}
      </div>
    </div>
  );
}
