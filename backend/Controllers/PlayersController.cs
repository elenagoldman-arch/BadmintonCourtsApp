using BadmintonCourtsApp.Models;
using BadmintonCourtsApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BadmintonCourtsApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayersController : ControllerBase
{
    private readonly ICourtService _courtService;

    public PlayersController(ICourtService courtService)
    {
        _courtService = courtService;
    }

    [HttpGet]
    public ActionResult<List<Player>> GetPlayers()
    {
        return Ok(_courtService.GetPlayers());
    }

    [HttpPost]
    public ActionResult<Player> AddPlayer([FromBody] AddPlayerRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Player name is required");
        }

        var player = _courtService.AddPlayer(request.Name);
        return Ok(player);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeletePlayer(int id)
    {
        var success = _courtService.DeletePlayer(id);
        if (!success)
        {
            return NotFound(new { message = "Player not found" });
        }

        return NoContent();
    }
}

public class AddPlayerRequest
{
    public string Name { get; set; } = string.Empty;
}

