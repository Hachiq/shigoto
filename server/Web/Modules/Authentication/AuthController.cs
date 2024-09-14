using Core.Constants;
using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Modules.Authentication;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
    ILogger<AuthController> _logger,
    IAuthService _authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterRequestModel request)
    {
        try
        {
            var response = await _authService.Register(request);

            return Ok(response);
        }
        catch (Exception ex) when (ex is EmailAndUsernameHaveBeenUsedException ||
                                   ex is EmailHasBeenUsedException ||
                                   ex is UsernameHasBeenUsedException)
        {
            string conflictReason = ex switch
            {
                EmailAndUsernameHaveBeenUsedException => UserConflicts.EmailAndUsernameTaken,
                EmailHasBeenUsedException => UserConflicts.EmailTaken,
                UsernameHasBeenUsedException => UserConflicts.UsernameTaken,
                _ => ""
            };

            return BadRequest(new ConflictResponse
            {
                ConflictReason = conflictReason,
                Message = ex.Message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Register user request failed. {username}, {email}",
                request.Username, request.Email);

            return BadRequest(ex);
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginRequestModel request)
    {
        try
        {
            var result = await _authService.Login(request);

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("refresh-token")]
    public async Task<ActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (refreshToken is null)
        {
            return Unauthorized();
        }

        var jwt = await _authService.RefreshAccessToken(refreshToken);
        return Ok(jwt);
    }
}
