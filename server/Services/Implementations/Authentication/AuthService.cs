using Core.Constants;
using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Entities;
using Core.Exceptions;

namespace Services.Implementations.Authentication;

public class AuthService(
    IRepository _db,
    IPasswordService _passwordService,
    IAccessTokenGenerator _accessTokenGenerator,
    IRefreshTokenGenerator _refreshTokenGenerator,
    IEmailSender _emailSender) : IAuthService
{

    public async Task<LoginRequestModel> Register(RegisterRequestModel model)
    {
        var existingUser = await _db.FindAsync<User>(u => u.Email == model.Email);

        if (existingUser is not null)
        {
            throw new EmailHasBeenUsedException();
        }

        _passwordService.CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = model.Username,
            Email = model.Email,
            EmailConfirmationToken = Guid.NewGuid(),
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt
        };

        var refreshToken = _refreshTokenGenerator.GenerateRefreshToken();

        user.RefreshToken = refreshToken;

        await _db.AddAsync(user);
        await _db.SaveChangesAsync();

        var confirmationLink = $"{Links.EmailConfirmation}/{user.EmailConfirmationToken}";
        var message = AuthConstants.EmailConfirmationMessage + confirmationLink;
        await _emailSender.SendEmailAsync(user.Email, AuthConstants.EmailConfirmationTitle, message);

        return new LoginRequestModel(user.Email, model.Password);
    }
    public async Task<LoginTokens> Login(LoginRequestModel model)
    {
        var user = await _db.FindAsync<User>(u => u.Email == model.Email) ?? throw new InvalidEmailException();

        var passwordMatch = _passwordService.VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt);

        if (!passwordMatch)
        {
            throw new WrongPasswordException();
        }

        var jwt = _accessTokenGenerator.GenerateAccessToken(user);

        var refreshToken = await _db.FindAsync<RefreshToken>(rt => rt.Id == user.RefreshTokenId);

        // TODO: Custom exception
        if (refreshToken is null)
        {
            throw new Exception("Couldn't get the refresh token");
        }

        return new LoginTokens(jwt, refreshToken);
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
