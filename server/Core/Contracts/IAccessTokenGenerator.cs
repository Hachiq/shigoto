using Core.Entities;

namespace Core.Contracts;

public interface IAccessTokenGenerator
{
    string GenerateAccessToken(User user);
}
