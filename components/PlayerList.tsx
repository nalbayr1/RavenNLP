import React, { useState, useEffect } from 'react';

interface PlayerListProps {
  searchQuery: string; 
}

const PlayerList: React.FC<PlayerListProps> = ({ searchQuery }) => {
  const [players, setPlayers] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bioVisible, setBioVisible] = useState<{ [key: number]: boolean }>({}); 

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch('/api/players/'); 
        if (!res.ok) {
          throw new Error(`Failed to fetch players: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Players fetched from the API:', data);
        setPlayers(data);
        setBioVisible(data.reduce((acc: any, _: any, i: number) => ({ ...acc, [i]: true }), {}));
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Error fetching players');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  
  const toggleBioVisibility = (index: number) => {
    setBioVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (loading) {
    return <div>Loading players...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

 
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      gap: '20px',
      padding: '20px',
      backgroundColor: '#22186B', 
    }}>
      {filteredPlayers.length > 0 ? (
        filteredPlayers.map((player: any, index: number) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center', 
            backgroundColor: '#000000',
            color: '#ecf0f1',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}>
            {player.photo && (
              <div style={{
                flexShrink: 0, 
                width: '300px', 
                height: '300px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '20px',
                overflow: 'hidden', 
              }}>
                <img
                  src={player.photo}
                  alt={`${player.name}'s photo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '80px', 
                    objectFit: 'contain', 
                  }}
                />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 10px', fontSize: '1.5rem' }}>{player.name}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <p style={{ margin: '0' }}><strong>Height:</strong> {player.height || "Unknown"}</p>
                <p style={{ margin: '0' }}><strong>Age:</strong> {player.age || "Unknown"}</p>
                <p style={{ margin: '0' }}><strong>Weight:</strong> {player.weight ? `${player.weight} lbs` : "Unknown"}</p>
                <p style={{ margin: '0' }}><strong>Position:</strong> {player.position || "Unknown"}</p>
              </div>
              {bioVisible[index] && (
                <div style={{
                  marginTop: '15px',
                  backgroundColor: '#2c2c2c', 
                  padding: '15px',
                  borderRadius: '5px',
                  border: '1px solid #444',
                  textAlign: 'left',
                  color: '#dcdcdc',
                }}>
                  <p>{player.playerInfo || "Bio unavailable"}</p>
                </div>
              )}
              <button 
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  backgroundColor: '#D0A043',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  alignSelf: 'flex-start',
                }}
                onClick={() => toggleBioVisibility(index)}
              >
                {bioVisible[index] ? 'Hide Bio' : 'View Bio'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No players found</div>
      )}
    </div>
  );
};

export default PlayerList;
