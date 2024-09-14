using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Entities;
using Core.Exceptions;

namespace Services.Implementations.Authentication;

public class AuthService(
    IRepository _db,
    IPasswordService _passwordService,
    IAccessTokenGenerator _accessTokenGenerator,
    IRefreshTokenGenerator _refreshTokenGenerator) : IAuthService
{

    public async Task Register(RegisterRequestModel model)
    {
        // TODO: make it work when username and email are taken by different users

        var existingUser = await _db.FindAsync<User>(u => u.Username == model.Username || u.Email == model.Email);

        if (existingUser is not null)
        {
            if (existingUser.Username == model.Username && existingUser.Email == model.Email)
            {
                throw new EmailAndUsernameHaveBeenUsedException();
            }
            else if (existingUser.Email == model.Email)
            {
                throw new EmailHasBeenUsedException();
            }
            else if (existingUser.Username == model.Username)
            {
                throw new UsernameHasBeenUsedException();
            }
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
            throw new WrongUsernameOrPasswordException();
        }

        var passwordMatch = _passwordService.VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt);

        if (!passwordMatch)
        {
            throw new WrongUsernameOrPasswordException();
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
            throw new InvalidRefreshTokenException();
        }

        var jwt = _accessTokenGenerator.GenerateAccessToken(user);

        return jwt;
    }
}
