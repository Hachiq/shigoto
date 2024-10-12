using Core.Constants;
using Core.Contracts;
using Core.DTOs;
using Core.DTOs.Authentication;
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
    public async Task<IActionResult> Register(RegisterRequestModel request)
    {
        try
        {
            var response = await _authService.Register(request);

            return Ok(new Response<LoginRequestModel>
            {
                Success = true,
                Payload = response
            });
        }
        catch (EmailHasBeenUsedException)
        {
            return Ok(new Response
            {
                Success = false,
                ErrorType = AuthConstants.Conflict
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
    public async Task<IActionResult> Login(LoginRequestModel request)
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

            return Ok(new Response
            {
                Success = true
            });
        }
        catch (Exception ex) when (ex is InvalidEmailException || ex is WrongPasswordException)
        {
            return Ok(new Response
            {
                Success = false,
                ErrorType = AuthConstants.InvalidCredentials
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("confirm-email")]
    public async Task<IActionResult> ConfirmEmail(ConfirmEmailModel request)
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
