import { Court } from '../types';
import { api } from '../services/api';

interface CourtCardProps {
  court: Court;
  onMatchEnded: () => void;
}

export default function CourtCard({ court, onMatchEnded }: CourtCardProps) {
  const handleEndMatch = async () => {
    try {
      await api.endMatch(court.id);
      onMatchEnded();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to end match');
    }
  };

  const handleCloseCourt = async () => {
    try {
      console.log('Closing court:', court.id);
      await api.closeCourt(court.id);
      console.log('Court closed successfully');
      onMatchEnded();
    } catch (error) {
      console.error('Error closing court:', error);
      alert(error instanceof Error ? error.message : 'Failed to close court');
    }
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${
      court.isActive 
        ? 'border-green-500 bg-green-50' 
        : 'border-gray-300 bg-gray-50'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Court {court.id}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          court.isActive 
            ? 'bg-green-200 text-green-800' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {court.isActive ? 'Active' : 'Available'}
        </span>
      </div>

      {court.isActive ? (
        <>
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-2 gap-2">
              {court.players.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-2 rounded ${
                    index < 2 ? 'bg-blue-100' : 'bg-purple-100'
                  }`}
                >
                  <p className="text-sm font-medium">{player.name}</p>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-600 text-center mt-2">
              Team 1 vs Team 2
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEndMatch}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              End Match
            </button>
            <button
              onClick={handleCloseCourt}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Close Court
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center py-4">No match in progress</p>
      )}
    </div>
  );
}

