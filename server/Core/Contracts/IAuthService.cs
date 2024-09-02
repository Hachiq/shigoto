using Core.DTOs.Authentication;

namespace Core.Contracts;

public interface IAuthService
{
    Task Register(RegisterRequestModel model);
    Task Login(LoginRequestModel model);
}
