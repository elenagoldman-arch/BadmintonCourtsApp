using BadmintonCourtsApp.Models;

namespace BadmintonCourtsApp.Services;

public class CourtService : ICourtService
{
    private readonly List<Player> _players = new();
    private readonly List<Court> _courts = new();
    private int _nextPlayerId = 1;
    private readonly object _lock = new();

    public CourtService()
    {
        // Initialize 6 courts
        for (int i = 1; i <= 6; i++)
        {
            _courts.Add(new Court { Id = i, IsActive = false });
        }
    }

    public List<Player> GetPlayers()
    {
        lock (_lock)
        {
            return _players.ToList();
        }
    }

    public Player AddPlayer(string name)
    {
        lock (_lock)
        {
            var player = new Player
            {
                Id = _nextPlayerId++,
                Name = name,
                Status = PlayerStatus.Waiting
            };
            _players.Add(player);
            return player;
        }
    }

    public List<Court> GetCourts()
    {
        lock (_lock)
        {
            return _courts.Select(c => new Court
            {
                Id = c.Id,
                Players = c.Players.ToList(),
                IsActive = c.IsActive
            }).ToList();
        }
    }

    public bool StartMatch()
    {
        lock (_lock)
        {
            var waitingPlayers = _players.Where(p => p.Status == PlayerStatus.Waiting).ToList();
            
            if (waitingPlayers.Count < 4)
            {
                return false; // Not enough players
            }

            // Find first available court
            var availableCourt = _courts.FirstOrDefault(c => !c.IsActive);
            if (availableCourt == null)
            {
                return false; // No available courts
            }

            // Take next 4 players from queue
            var playersToAssign = waitingPlayers.Take(4).ToList();
            
            foreach (var player in playersToAssign)
            {
                player.Status = PlayerStatus.Playing;
            }

            availableCourt.Players = playersToAssign;
            availableCourt.IsActive = true;

            return true;
        }
    }

    public bool EndMatch(int courtId)
    {
        lock (_lock)
        {
            var court = _courts.FirstOrDefault(c => c.Id == courtId);
            if (court == null || !court.IsActive)
            {
                return false;
            }

            // Move players back to end of queue
            foreach (var player in court.Players)
            {
                player.Status = PlayerStatus.Waiting;
                // Remove and re-add to end of queue
                _players.Remove(player);
                _players.Add(player);
            }

            court.Players.Clear();
            court.IsActive = false;

            // Automatically assign next 4 players if available
            var waitingPlayers = _players.Where(p => p.Status == PlayerStatus.Waiting).ToList();
            if (waitingPlayers.Count >= 4)
            {
                var playersToAssign = waitingPlayers.Take(4).ToList();
                
                foreach (var player in playersToAssign)
                {
                    player.Status = PlayerStatus.Playing;
                }

                court.Players = playersToAssign;
                court.IsActive = true;
            }

            return true;
        }
    }

    public bool CloseCourt(int courtId)
    {
        lock (_lock)
        {
            var court = _courts.FirstOrDefault(c => c.Id == courtId);
            if (court == null)
            {
                return false;
            }

            // If court has players, move them back to end of queue
            if (court.Players != null && court.Players.Count > 0)
            {
                foreach (var player in court.Players)
                {
                    player.Status = PlayerStatus.Waiting;
                    // Remove and re-add to end of queue
                    _players.Remove(player);
                    _players.Add(player);
                }
                court.Players.Clear();
            }

            // Set court to available (not active)
            court.IsActive = false;

            // Don't auto-assign new players - just close the court
            return true;
        }
    }

    public int GetWaitingPlayerCount()
    {
        lock (_lock)
        {
            return _players.Count(p => p.Status == PlayerStatus.Waiting);
        }
    }
}

