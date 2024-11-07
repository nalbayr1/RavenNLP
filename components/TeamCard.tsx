import React from 'react';

interface TeamCardProps {
  team: { name: string };
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div style={{
      backgroundColor: '#000000', // Dark container background
      borderRadius: '10px',
      padding: '40px', // Further increased padding to make the content larger
      margin: '5px', // Reduced margin between cards
      textAlign: 'center',
      color: '#ecf0f1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '300px', // Increased width to 300px
      maxWidth: '300px',
      height: '350px', // Increased height to 350px
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add some shadow for effect
    }}>
      <h2 style={{ fontSize: '1.5rem' }}>{team.name}</h2> {/* Increased font size */}
      <button style={{
        marginTop: 'auto', // Push the button to the bottom
        padding: '15px 25px', // Increased padding for the button
        backgroundColor: '#D0A043', // Gold-ish color
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
