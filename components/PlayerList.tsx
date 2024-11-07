import React, { useState, useEffect } from 'react';

interface PlayerListProps {
  searchQuery: string; // Accept search query as a prop
}

const PlayerList: React.FC<PlayerListProps> = ({ searchQuery }) => {
  const [players, setPlayers] = useState<any[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null); // Track any errors
  const [bioVisible, setBioVisible] = useState<{ [key: number]: boolean }>({}); // Track visibility of player bios

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch('/api/players/'); // Adjusted API route
        if (!res.ok) {
          throw new Error(`Failed to fetch players: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Players fetched from the API:', data);
        setPlayers(data); // Set the players data
        setBioVisible(data.reduce((acc: any, _: any, i: number) => ({ ...acc, [i]: true }), {})); // Make bios initially visible
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Error fetching players');
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchPlayers();
  }, []);

  // Toggle player bio visibility
  const toggleBioVisibility = (index: number) => {
    setBioVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (loading) {
    return <div>Loading players...</div>; // Handle loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  // Filter players based on the search query
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', // Stack players vertically
      gap: '20px',
      padding: '20px',
      backgroundColor: '#22186B', // Set main background color
    }}>
      {filteredPlayers.length > 0 ? (
        filteredPlayers.map((player: any, index: number) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center', // Center content vertically
            backgroundColor: '#000000', // Player container color set to Black
            color: '#ecf0f1',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}>
            {player.photo && (
              <div style={{
                flexShrink: 0, // Prevent image from shrinking
                width: '300px', // Increase the width of the image container
                height: '300px', // Increase the height of the image container
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '20px',
                overflow: 'hidden', // Ensure no content spills out
              }}>
                <img
                  src={player.photo}
                  alt={`${player.name}'s photo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '80px', // Updated to round the image more
                    objectFit: 'contain', // Prevent image from being cropped
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
                  backgroundColor: '#2c2c2c', // Bio container color set to Dark Gray
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
