import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import NotesModal from './NotesModal'; // Import the NotesModal component

interface Player {
  id: number;
  name: string;
  photo?: string;
  playerInfo?: string;
  height?: string;
  age?: string;
  weight?: string;
  position?: string;
}

interface PlayerListProps {
  searchQuery?: string;
  players?: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ searchQuery = '', players: initialPlayers }) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers || []);
  const [loading, setLoading] = useState(!initialPlayers);
  const [error, setError] = useState<string | null>(null);
  const [bioVisible, setBioVisible] = useState<{ [key: number]: boolean }>({});
  const [favoritePlayerIds, setFavoritePlayerIds] = useState<number[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  // State to manage the open Notes modals
  const [notesModalOpen, setNotesModalOpen] = useState<{ [key: number]: boolean }>({});

  // Fetch the userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  // Fetch all players if not provided as props
  useEffect(() => {
    if (!initialPlayers) {
      const fetchPlayers = async () => {
        try {
          const res = await fetch('/api/players');
          if (!res.ok) {
            throw new Error(`Failed to fetch players: ${res.statusText}`);
          }
          const data = await res.json();
          setPlayers(data);
          // Initialize bio visibility and notes modal visibility for each player
          setBioVisible(
            data.reduce((acc: any, _: any, i: number) => ({ ...acc, [i]: true }), {})
          );
          setNotesModalOpen(
            data.reduce((acc: any, player: Player) => ({ ...acc, [player.id]: false }), {})
          );
        } catch (error) {
          console.error('Error fetching players:', error);
          setError('Error fetching players');
        } finally {
          setLoading(false);
        }
      };

      fetchPlayers();
    } else {
      // Initialize bio visibility and notes modal visibility for each player
      setBioVisible(
        initialPlayers.reduce((acc: any, _: any, i: number) => ({ ...acc, [i]: true }), {})
      );
      setNotesModalOpen(
        initialPlayers.reduce((acc: any, player: Player) => ({ ...acc, [player.id]: false }), {})
      );
    }
  }, [initialPlayers]);

  // Fetch the list of favorite player IDs for the logged-in user
  useEffect(() => {
    const fetchFavoritePlayers = async () => {
      try {
        if (userId !== null) {
          const res = await fetch(`/api/users/${userId}/favorites`);
          if (!res.ok) {
            throw new Error(`Failed to fetch favorite players: ${res.statusText}`);
          }
          const data = await res.json();
          setFavoritePlayerIds(data.map((player: Player) => player.id));
        }
      } catch (error) {
        console.error('Error fetching favorite players:', error);
      }
    };

    fetchFavoritePlayers();
  }, [userId]);

  // Toggle the visibility of the player's bio
  const toggleBioVisibility = (index: number) => {
    setBioVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Handle adding or removing a player from favorites
  const handleFavoriteToggle = async (playerId: number) => {
    try {
      if (userId === null) {
        console.error('User not logged in');
        return;
      }

      const isFavorited = favoritePlayerIds.includes(playerId);

      const res = await fetch(`/api/users/${userId}/favorites/${playerId}`, {
        method: isFavorited ? 'DELETE' : 'POST',
      });

      if (!res.ok) {
        throw new Error(
          `Failed to ${isFavorited ? 'remove' : 'add'} player from favorites: ${res.statusText}`
        );
      }

      if (isFavorited) {
        setFavoritePlayerIds((prevIds) => prevIds.filter((id) => id !== playerId));
      } else {
        setFavoritePlayerIds((prevIds) => [...prevIds, playerId]);
      }
    } catch (error) {
      console.error('Error updating favorite players:', error);
    }
  };

  // Handle opening and closing the Notes modal
  const openNotesModal = (playerId: number) => {
    setNotesModalOpen((prevState) => ({
      ...prevState,
      [playerId]: true,
    }));
  };

  const closeNotesModal = (playerId: number) => {
    setNotesModalOpen((prevState) => ({
      ...prevState,
      [playerId]: false,
    }));
  };

  if (loading) {
    return <div>Loading players...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter players based on the search query
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#22186B',
      }}
    >
      {filteredPlayers.length > 0 ? (
        filteredPlayers.map((player: Player, index: number) => (
          <div
            key={player.id}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#000000',
              color: '#ecf0f1',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Star Icon for Favorite */}
            <FaStar
              onClick={() => handleFavoriteToggle(player.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                color: favoritePlayerIds.includes(player.id) ? '#FFD700' : '#ccc',
              }}
              size={24}
            />

            {/* Player Photo */}
            {player.photo && (
              <div
                style={{
                  flexShrink: 0,
                  width: '300px',
                  height: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '20px',
                  overflow: 'hidden',
                }}
              >
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

            {/* Player Details */}
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 10px', fontSize: '1.5rem' }}>{player.name}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <p style={{ margin: '0' }}>
                  <strong>Height:</strong> {player.height || 'Unknown'}
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Age:</strong> {player.age || 'Unknown'}
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Weight:</strong> {player.weight ? `${player.weight} lbs` : 'Unknown'}
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Position:</strong> {player.position || 'Unknown'}
                </p>
              </div>

              {/* Player Bio */}
              {bioVisible[index] && (
                <div
                  style={{
                    marginTop: '15px',
                    backgroundColor: '#2c2c2c',
                    padding: '15px',
                    borderRadius: '5px',
                    border: '1px solid #444',
                    textAlign: 'left',
                    color: '#dcdcdc',
                  }}
                >
                  <p>{player.playerInfo || 'Bio unavailable'}</p>
                </div>
              )}

              {/* Buttons Container */}
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                {/* Toggle Bio Button */}
                <button
                  style={{
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

                {/* Notes Button */}
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2980b9',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    alignSelf: 'flex-start',
                  }}
                  onClick={() => openNotesModal(player.id)}
                >
                  Notes
                </button>
              </div>
            </div>

            {/* Notes Modal */}
            {notesModalOpen[player.id] && (
              <NotesModal onClose={() => closeNotesModal(player.id)} player={player} />
            )}
          </div>
        ))
      ) : (
        <div>No players found</div>
      )}
    </div>
  );
};

export default PlayerList;
