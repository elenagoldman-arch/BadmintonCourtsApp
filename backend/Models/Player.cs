namespace BadmintonCourtsApp.Models;

public class Player
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public PlayerStatus Status { get; set; }
}

public enum PlayerStatus
{
    Waiting,
    Playing
}

