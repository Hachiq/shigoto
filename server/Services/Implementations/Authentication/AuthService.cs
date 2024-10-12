using Core.Constants;
using Core.Contracts;
using Core.DTOs.Authentication;
using Core.Entities;
using Core.Exceptions;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace Services.Implementations.Authentication;

public class AuthService(
    IRepository _db,
    IPasswordService _passwordService,
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

        await _db.AddAsync(user);
        await _db.SaveChangesAsync();

        var confirmationLink = $"{Links.EmailConfirmation}?userId={user.Id}&token={user.EmailConfirmationToken}";
        var message = AuthConstants.EmailConfirmationMessage + confirmationLink;
        await _emailSender.SendEmailAsync(user.Email, AuthConstants.EmailConfirmationTitle, message);

        return new LoginRequestModel(user.Email, model.Password);
    }
    public async Task<ClaimsIdentity> Login(LoginRequestModel model)
    {
        var user = await _db.FindAsync<User>(u => u.Email == model.Email) ?? throw new InvalidEmailException();

        var passwordMatch = _passwordService.VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt);

        if (!passwordMatch)
        {
            throw new WrongPasswordException();
        }

        var claims = new List<Claim>
        {
            new("id", user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.Username)
        };

        var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);

        return claimsIdentity;
    }

    public async Task ConfirmEmail(ConfirmEmailModel model)
    {
        var user = await _db.FindAsync<User>(u => u.Id == model.UserId) ?? throw new UserNotFoundException();

        if (user.EmailConfirmationToken != model.EmailConfirmationToken)
        {
            throw new InvalidEmailConfirmationTokenException();
        }

        user.EmailConfirmed = true;
        user.EmailConfirmationToken = Guid.NewGuid();
        _db.Update(user);
        await _db.SaveChangesAsync();
    }
}
