using Core.DTOs.Authentication;
using System.Security.Claims;

namespace Core.Contracts;

public interface IAuthService
{
    Task<LoginRequestModel> Register(RegisterRequestModel model);
    Task<ClaimsIdentity> Login(LoginRequestModel model);
    Task ConfirmEmail(ConfirmEmailModel model);
    Task<string> RefreshAccessToken(string token);
}
