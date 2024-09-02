using Core.Contracts;
using Core.DTOs.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Modules.Authentication;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterRequestModel request)
    {
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginRequestModel request)
    {
        return Ok();
    }
}
