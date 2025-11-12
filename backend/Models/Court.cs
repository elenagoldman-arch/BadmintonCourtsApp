namespace BadmintonCourtsApp.Models;

public class Court
{
    public int Id { get; set; }
    public List<Player> Players { get; set; } = new();
    public bool IsActive { get; set; }
}

