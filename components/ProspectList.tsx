import React, { useState, useEffect } from 'react';

interface ProspectListProps {
  searchQuery: string; 
}

const ProspectList: React.FC<ProspectListProps> = ({ searchQuery }) => {
  const [prospects, setProspects] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const res = await fetch('/api/prospects/'); 
        if (!res.ok) {
          throw new Error(`Failed to fetch prospects: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Prospects fetched from the API:', data);
        setProspects(data);
      } catch (error) {
        console.error('Error fetching prospects:', error);
        setError('Error fetching prospects');
      } finally {
        setLoading(false);
      }
    };

    fetchProspects();
  }, []);

  if (loading) {
    return <div>Loading prospects...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }
 
  const filteredProspects = prospects.filter((prospect) =>
    prospect.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      gap: '20px',
      padding: '20px',
      backgroundColor: '#22186B', 
    }}>
      {filteredProspects.length > 0 ? (
        filteredProspects.map((prospect: any, index: number) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center', 
            backgroundColor: '#000000',
            color: '#ecf0f1',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 10px', fontSize: '1.5rem' }}>{prospect.name}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <p style={{ margin: '0' }}><strong>Height:</strong> {prospect.height || "Unknown"}</p>
                <p style={{ margin: '0' }}><strong>Age:</strong> {prospect.age || "Unknown"}</p>
                <p style={{ margin: '0' }}><strong>Weight:</strong> {prospect.weight ? `${prospect.weight} lbs` : "Unknown"}</p>
                <p style={{ margin: '0' }}><strong>Position:</strong> {prospect.position || "Unknown"}</p>
                <p style={{ margin: '0' }}><strong>School:</strong> {prospect.school || "Unknown"}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No players found</div>
      )}
    </div>
  );
};

export default ProspectList;
