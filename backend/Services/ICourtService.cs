using BadmintonCourtsApp.Models;

namespace BadmintonCourtsApp.Services;

public interface ICourtService
{
    List<Player> GetPlayers();
    Player AddPlayer(string name);
    List<Court> GetCourts();
    bool StartMatch();
    bool EndMatch(int courtId);
    bool DeletePlayer(int playerId);
    bool CloseCourt(int courtId);
    int GetWaitingPlayerCount();
}

