using Core.Contracts;
using Core.Entities;
using System.Security.Cryptography;

namespace Services.Implementations.Security;

public class RefreshTokenGenerator : IRefreshTokenGenerator
{
    public RefreshToken GenerateRefreshToken()
    {
        var refreshToken = new RefreshToken()
        {
            Id = Guid.NewGuid(),
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = DateTime.UtcNow.AddDays(30)
        };

        return refreshToken;
    }
}
