import { useState, useEffect } from 'react';
import { Player, CourtsResponse } from './types';
import { api } from './services/api';
import AddPlayerForm from './components/AddPlayerForm';
import CourtList from './components/CourtList';
import PlayerQueue from './components/PlayerQueue';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [courts, setCourts] = useState<CourtsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const [playersData, courtsData] = await Promise.all([
        api.getPlayers(),
        api.getCourts(),
      ]);
      setPlayers(playersData);
      setCourts(courtsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 3 seconds
    const interval = setInterval(fetchData, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePlayerAdded = () => {
    fetchData();
  };

  const handleStartMatch = async () => {
    try {
      await api.startMatch();
      fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to start match');
    }
  };

  const handleMatchEnded = () => {
    fetchData();
  };

  const handleDeletePlayer = async (playerId: number) => {
    try {
      await api.deletePlayer(playerId);
      fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete player');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🏸 Badminton Court Management
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <AddPlayerForm onPlayerAdded={handlePlayerAdded} />
          
          <div className="flex justify-center mb-6">
            <button
              onClick={handleStartMatch}
              disabled={!courts || courts.waitingPlayerCount < 4}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Start Match (Auto-assign 4 players)
            </button>
          </div>

          {courts && (
            <>
              <CourtList courts={courts.courts} onMatchEnded={handleMatchEnded} />
              <PlayerQueue
                players={players}
                waitingCount={courts.waitingPlayerCount}
                onDeletePlayer={handleDeletePlayer}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

