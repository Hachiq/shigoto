using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Entities;

namespace Services.Implementations.Authentication;

public class AuthService(
    IRepository _db,
    IPasswordService _passwordService,
    IAccessTokenGenerator _accessTokenGenerator,
    IRefreshTokenGenerator _refreshTokenGenerator) : IAuthService
{

    public async Task Register(RegisterRequestModel model)
    {
        var checkExistingUsername = await _db.FindAsync<User>(u => u.Username == model.Username);
        if (checkExistingUsername is not null)
        {
            throw new Exception("User with such username already exists"); // Use custom exception
        }

        var checkExistingEmail = await _db.FindAsync<User>(u => u.Email == model.Email);
        if (checkExistingEmail is not null)
        {
            throw new Exception("User with such email already exists"); // Use custom exception
        }

        _passwordService.CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = model.Username,
            Email = model.Email,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt
        };

        var refreshToken = _refreshTokenGenerator.GenerateRefreshToken();

        user.RefreshToken = refreshToken;

        await _db.AddAsync(user);
        await _db.SaveChangesAsync();
    }
    public async Task<string> Login(LoginRequestModel model)
    {
        var user = await _db.FindAsync<User>(u => u.Username == model.Username);

        if (user is null)
        {
            throw new Exception("Couldn't find the user."); // Use custom exception
        }

        var passwordMatch = _passwordService.VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt);

        if (!passwordMatch)
        {
            throw new Exception("Wrong password."); // Use custom exception
        }

        var jwt = _accessTokenGenerator.GenerateAccessToken(user);

        return jwt;
    }

    public async Task<string> RefreshAccessToken(string token)
    {
        // Consider using this line
        //var user = await _db.FindAsync<User>(u => u.RefreshToken.Token == token);

        var refreshToken = await _db.FindAsync<RefreshToken>(rt => rt.Token == token);
        var user = await _db.FindAsync<User>(u => u.RefreshToken == refreshToken);

        if (user is null)
        {
            throw new Exception("Wrong refresh token."); // Use custom exception
        }

        var jwt = _accessTokenGenerator.GenerateAccessToken(user);

        return jwt;
    }
}
