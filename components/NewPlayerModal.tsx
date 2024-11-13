import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../my-app/src/firebase';

interface NewPlayerModalProps {
  onClose: () => void;
}

const NewPlayerModal: React.FC<NewPlayerModalProps> = ({ onClose }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [textFiles, setTextFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 

  const defaultPhotoPath = '/photos/noattachment.png'; 

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
    }
  };

  const handleTextFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setTextFiles(filesArray);
    }
  };

  const uploadPhotoToFirebase = async (): Promise<string> => {
    if (!photo) {
      return defaultPhotoPath;
    }
    const storageRef = ref(storage, `players/photos/${photo.name}`);
    try {
      await uploadBytes(storageRef, photo);
      const url = await getDownloadURL(storageRef);
      console.log('Image URL:', url);
      return url;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return defaultPhotoPath; 
    }
  };

  const handleSubmit = async () => {
    setLoading(true); 
    try {
      console.log('Submitting form...');
      const uploadedPhotoURL = await uploadPhotoToFirebase();
      const playerResponse = await fetch('/api/players/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: playerName,
          details,
          photoURL: uploadedPhotoURL,
        }),
      });

      if (!playerResponse.ok) {
        console.error('Failed to create player:', playerResponse.statusText);
        return;
      }

      const { player } = await playerResponse.json();
      console.log('Player created:', player);

     
      let textContent = '';
      if (textFiles.length > 0) {
        const file = textFiles[0];
        textContent = await file.text();
      }

      const gptResponse = await fetch('/api/chatgpt/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: player.id,
          name: player.name,
          details,
          textContent,
        }),
      });

      if (!gptResponse.ok) {
        console.error('Failed to send data to GPT:', gptResponse.statusText);
        return;
      }

      const gptResult = await gptResponse.json();
      console.log('GPT Response:', gptResult);

     
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    } catch (error) {
      console.error('Error during form submission:', error);
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <div style={modalContainerStyle}>
        <div style={modalContentStyle}>
          <h2 style={titleStyle}>Processing...</h2>
          <p>Please wait while we process your request.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={modalContainerStyle}>
      <div style={modalContentStyle}>
        <h2 style={titleStyle}>Add New Player</h2>

        
        <input
          type="text"
          placeholder="Enter player's name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={inputStyle}
        />

       
        <input
          type="text"
          placeholder="Type wanted details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          style={inputStyle}
        />

       
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold' }}>Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={fileInputStyle}
          />
        </div>

      
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold' }}>Upload Text Files</label>
          <input
            type="file"
            accept=".txt"
            multiple
            onChange={handleTextFilesUpload}
            style={fileInputStyle}
          />
        </div>

        
        <button onClick={handleSubmit} style={submitButtonStyle}>Submit</button>
        <button onClick={onClose} style={cancelButtonStyle}>Cancel</button>
      </div>
    </div>
  );
};

export default NewPlayerModal;


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
  width: '400px',
  color: '#fff',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  marginBottom: '20px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  backgroundColor: '#2c2c2c',
  color: '#ecf0f1',
  fontSize: '1rem',
};

const fileInputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '10px',
  backgroundColor: '#2c2c2c',
  color: '#ecf0f1',
  borderRadius: '5px',
  border: '1px solid #ddd',
  marginBottom: '15px',
};

const submitButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#2980b9',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer',
  marginBottom: '10px',
  width: '100%',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer',
  width: '100%',
};
