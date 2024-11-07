import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TeamCard from '../components/TeamCard'; // Import the TeamCard component

export default function TeamSearch() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teams, setTeams] = useState<any[]>([]); // State to store the teams
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }

    // Fetch teams from API
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

  // Filter teams based on the search query, matching only the first letters of words in the team name
  const filteredTeams = teams.filter((team: any) => {
    const words = team.name.toLowerCase().split(' '); // Split the team name into words
    const query = searchQuery.toLowerCase(); // Convert the search query to lowercase

    // Check if the query matches the first letters of any of the words
    return words.some((word: string) => word.startsWith(query));
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{
        flexGrow: 1,
        padding: '30px', // Increased padding to accommodate larger containers
        backgroundColor: '#22186B', // Match the background color
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Search Bar */}
        <div style={{
          backgroundColor: '#000',
          padding: '30px', // Increased padding for the header container
          borderRadius: '10px',
          marginRight: '10px',
          marginBottom: '30px',
        }}>
          <h1 style={{
            fontSize: '2.5rem', // Increased font size for the title
            marginBottom: '10px',
            color: '#ecf0f1',
          }}>Team Search</h1>

          {/* Search Input for Teams */}
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
              backgroundColor: '#2c2c2c',  // Dark gray background for search input
              color: '#ecf0f1',  // Light text color for better visibility
            }}
          />
        </div>

        {/* Teams List in Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // Still 4 columns, but the items are larger
          gap: '15px', // Reduced gap between grid items
          padding: '15px', // Increased padding inside the grid container
          backgroundColor: '#22186B',
          borderRadius: '10px',
          overflowY: 'auto',
        }}>
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team: any, index: number) => (
              <TeamCard key={index} team={team} /> // Render the TeamCard component
            ))
          ) : (
            <div>No teams found</div>
          )}
        </div>
      </div>
    </div>
  );
}
