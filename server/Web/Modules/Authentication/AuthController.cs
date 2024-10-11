using Core.Constants;
using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Entities;
using Core.Exceptions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        catch (EmailHasBeenUsedException)
        {
            return Ok(new ConflictResponse());
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

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                IsPersistent = true,
                IssuedUtc = DateTimeOffset.UtcNow
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(result),
                authProperties);

            return Ok();
        }
        catch (Exception ex) when (ex is InvalidEmailException || ex is WrongPasswordException)
        {
            return Ok(new LoginErrorResponse
            {
                ErrorType = AuthConstants.InvalidCredentials
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("confirm-email")]
    public async Task<ActionResult> ConfirmEmail(ConfirmEmailModel request)
    {
        await _authService.ConfirmEmail(request);
        return Ok();
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok();
    }
}
