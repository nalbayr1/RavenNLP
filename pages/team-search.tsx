import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TeamCard from '../components/TeamCard'; 

export default function TeamSearch() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teams, setTeams] = useState<any[]>([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }

    
    const fetchTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        if (!res.ok) {
          throw new Error(`Failed to fetch teams: ${res.statusText}`);
        }
        const data = await res.json();
        setTeams(data);
      } catch (error) {
        setError('Error fetching teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading teams...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 
  const filteredTeams = teams.filter((team: any) => {
    const words = team.name.toLowerCase().split(' '); 
    const query = searchQuery.toLowerCase(); 
    return words.some((word: string) => word.startsWith(query));
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{
        flexGrow: 1,
        padding: '30px', 
        backgroundColor: '#22186B', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}>
      
        <div style={{
          backgroundColor: '#000',
          padding: '30px', 
          borderRadius: '10px',
          marginRight: '10px',
          marginBottom: '30px',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '10px',
            color: '#ecf0f1',
          }}>Team Search</h1>

         
          <input
            type="text"
            placeholder="Search for a team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              backgroundColor: '#2c2c2c',  
              color: '#ecf0f1',  
            }}
          />
        </div>

       
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px', 
          padding: '15px', 
          backgroundColor: '#22186B',
          borderRadius: '10px',
          overflowY: 'auto',
        }}>
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team: any, index: number) => (
              <TeamCard key={index} team={team} /> 
            ))
          ) : (
            <div>No teams found</div>
          )}
        </div>
      </div>
    </div>
  );
}
