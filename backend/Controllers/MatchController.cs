using BadmintonCourtsApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BadmintonCourtsApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchController : ControllerBase
{
    private readonly ICourtService _courtService;

    public MatchController(ICourtService courtService)
    {
        _courtService = courtService;
    }

    [HttpPost("start")]
    public ActionResult StartMatch()
    {
        var success = _courtService.StartMatch();
        if (!success)
        {
            return BadRequest(new { message = "Not enough players or no available courts" });
        }
        return Ok(new { message = "Match started successfully" });
    }

    [HttpPost("end/{courtId}")]
    public ActionResult EndMatch(int courtId)
    {
        var success = _courtService.EndMatch(courtId);
        if (!success)
        {
            return BadRequest(new { message = "Court not found or not active" });
        }
        return Ok(new { message = "Match ended successfully" });
    }

    [HttpPost("close/{courtId}")]
    public ActionResult CloseCourt(int courtId)
    {
        var success = _courtService.CloseCourt(courtId);
        if (!success)
        {
            return BadRequest(new { message = "Court not found" });
        }
        return Ok(new { message = "Court closed successfully" });
    }
}

