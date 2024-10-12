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
    [HttpGet("user")]
    public IActionResult GetUser()
    {
        if (User?.Identity?.IsAuthenticated == false)
        {
            return Ok(new Response<UserResponse>
            {
                Success = false
            });
        }

        var id = User?.FindFirst("id")?.Value;
        var name = User?.Identity?.Name;
        var email = User?.FindFirst(ClaimTypes.Email)?.Value;

        if (id is null || name is null || email is null)
        {
            return Ok(new Response<UserResponse>
            {
                Success = false
            });
        }
        var user = new UserResponse(Id: id, Name: name, Email: email);
        return Ok(new Response<UserResponse>
        {
            Success = true,
            Payload = user
        });
    }

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
