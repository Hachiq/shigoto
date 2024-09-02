using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Entities;

namespace Services.Implementations.Authentication;

public class AuthService(
    IRepository db,
    IPasswordService passwordService,
    IAccessTokenGenerator accessTokenGenerator,
    IRefreshTokenGenerator refreshTokenGenerator) : IAuthService
{

    public async Task Register(RegisterRequestModel model)
    {
        passwordService.CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = model.Username,
            Email = model.Email,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt
        };

        var refreshToken = refreshTokenGenerator.GenerateRefreshToken();

        user.RefreshToken = refreshToken;

        await db.AddAsync(user);
        await db.SaveChangesAsync();
    }
    public Task Login(LoginRequestModel model)
    {
        throw new NotImplementedException();
    }
}
