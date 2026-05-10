using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/sms")]
public class SmsController : ControllerBase
{
    [HttpGet("random")]
    [ProducesResponseType(typeof(SmsScenario), StatusCodes.Status200OK)]
    public ActionResult<SmsScenario> GetRandom()
    {
        var scenario = SmsPredefinedScenarios.PickRandom();
        return Ok(scenario);
    }
}
