import { Player } from '../types';

interface PlayerQueueProps {
  players: Player[];
  waitingCount: number;
}

export default function PlayerQueue({ players, waitingCount }: PlayerQueueProps) {
  // Filter and display ONLY waiting players in the Waiting Queue
  // Handle both string and numeric enum values from backend
  const waitingPlayers = players.filter(p => {
    const status = String(p.status).toLowerCase();
    return status === 'waiting' || status === '0';
  });
  
  const playingPlayers = players.filter(p => {
    const status = String(p.status).toLowerCase();
    return status === 'playing' || status === '1';
  });

  // Debug: Log to see what we're receiving
  if (players.length > 0) {
    console.log('All players:', players);
    console.log('Waiting players:', waitingPlayers);
    console.log('Waiting count from backend:', waitingCount);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Waiting Queue</h2>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
            Players waiting: {waitingCount}
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
            Playing: {playingPlayers.length}
          </span>
        </div>
      </div>

      {/* Waiting Queue - Display ONLY waiting players */}
      {waitingPlayers.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No players waiting in queue</p>
          <p className="text-gray-400 text-sm mt-2">Add players to start building the queue</p>
        </div>
      ) : (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-700 mb-3 font-medium">
            ⏳ These players are waiting for their turn to play (in queue order):
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {waitingPlayers.map((player, index) => (
              <div
                key={player.id}
                className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg">{player.name}</span>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded font-bold">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">Waiting in queue</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Players List - Secondary Display */}
      {players.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-300">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">All Players</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {players.map((player) => (
              <div
                key={player.id}
                className={`p-3 rounded-lg shadow-sm border-2 ${
                  player.status === 'Playing'
                    ? 'bg-green-50 border-green-400'
                    : 'bg-blue-50 border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{player.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    player.status === 'Playing'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}>
                    {player.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500">ID: {player.id}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

