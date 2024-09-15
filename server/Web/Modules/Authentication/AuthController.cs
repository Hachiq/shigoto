using Core.Constants;
using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Entities;
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

            return Ok(new ConflictResponse
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

    // TODO: Add cookie authenticatation https://learn.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-8.0
    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginRequestModel request)
    {
        try
        {
            var result = await _authService.Login(request);

            SetCookiesRefreshToken(result.RefreshToken);

            return Ok(result.JWT);
        }
        catch (Exception ex) when (ex is WrongUsernameOrPasswordException)
        {
            return Ok(new LoginErrorResponse
            {
                ErrorType = AuthConstants.InvalidCredentials,
                Message = ex.Message
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("logout")]
    public IActionResult Logout()
    {
        ExpireCookiesRefreshToken();
        return Ok();
    }

    [HttpGet("refresh-token")]
    public async Task<ActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies[AuthConstants.RefreshToken];

        if (refreshToken is null)
        {
            return Unauthorized();
        }

        var jwt = await _authService.RefreshAccessToken(refreshToken);
        return Ok(jwt);
    }

    // TODO: Move it somewhere
    private void SetCookiesRefreshToken(RefreshToken newRefreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = newRefreshToken.ExpiresAt,
            SameSite = SameSiteMode.None,
            Secure = true
        };
        Response.Cookies.Append(AuthConstants.RefreshToken, newRefreshToken.Token, cookieOptions);
    }

    private void ExpireCookiesRefreshToken()
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddMinutes(-1),
            SameSite = SameSiteMode.None,
            Secure = true
        };
        Response.Cookies.Append(AuthConstants.RefreshToken, string.Empty, cookieOptions);
    }
}
