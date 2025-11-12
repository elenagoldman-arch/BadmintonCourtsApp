using BadmintonCourtsApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BadmintonCourtsApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourtsController : ControllerBase
{
    private readonly ICourtService _courtService;

    public CourtsController(ICourtService courtService)
    {
        _courtService = courtService;
    }

    [HttpGet]
    public ActionResult GetCourts()
    {
        var courts = _courtService.GetCourts();
        var waitingCount = _courtService.GetWaitingPlayerCount();
        
        return Ok(new
        {
            courts,
            waitingPlayerCount = waitingCount
        });
    }
}

