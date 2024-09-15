using Core.DTOs.Authentication;

namespace Core.Contracts;

public interface IAuthService
{
    Task<LoginRequestModel> Register(RegisterRequestModel model);
    Task<LoginTokens> Login(LoginRequestModel model);
    Task<string> RefreshAccessToken(string token);
}
