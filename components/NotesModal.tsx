import React, { useState } from 'react';

interface Player {
  id: number;
  name: string;
  // Add other player properties if needed
}

interface NotesModalProps {
  onClose: () => void;
  player: Player;
}

const NotesModal: React.FC<NotesModalProps> = ({ onClose, player }) => {
  const [notes, setNotes] = useState<string>('');

  const handleSave = () => {
    // Placeholder for save functionality
    console.log(`Notes for ${player.name}:`, notes);
    onClose();
  };

  return (
    <div style={modalContainerStyle}>
      <div style={modalContentStyle}>
        <h2 style={titleStyle}>Notes for {player.name}</h2>

        {/* Notes Textarea */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here..."
          style={textareaStyle}
        />

        {/* Buttons Container */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button onClick={handleSave} style={saveButtonStyle}>
            Save
          </button>
          <button onClick={onClose} style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;

// Styles for the modal and buttons
const modalContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#000',
  padding: '30px',
  borderRadius: '10px',
  width: '500px',
  color: '#fff',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  marginBottom: '20px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '200px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  backgroundColor: '#2c2c2c',
  color: '#ecf0f1',
  fontSize: '1rem',
  resize: 'none',
};

const saveButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px 20px',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer',
};
