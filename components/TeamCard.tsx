import React from 'react';

interface TeamCardProps {
  team: { name: string };
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div style={{
      backgroundColor: '#000000', 
      borderRadius: '10px',
      padding: '40px',
      margin: '5px', 
      textAlign: 'center',
      color: '#ecf0f1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '300px', 
      maxWidth: '300px',
      height: '350px', 
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    }}>
      <h2 style={{ fontSize: '1.5rem' }}>{team.name}</h2> 
      <button style={{
        marginTop: 'auto',
        padding: '15px 25px',
        backgroundColor: '#D0A043',
        border: 'none',
        borderRadius: '5px',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}>Select</button>
    </div>
  );
}

export default TeamCard;
