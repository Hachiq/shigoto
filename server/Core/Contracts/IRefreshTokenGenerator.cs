using Core.Entities;

namespace Core.Contracts;

public interface IRefreshTokenGenerator
{
    RefreshToken GenerateRefreshToken();
}
