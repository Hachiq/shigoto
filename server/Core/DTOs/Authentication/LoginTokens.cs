using Core.Entities;

namespace Core.DTOs.Authentication;
public record LoginTokens(string JWT, RefreshToken RefreshToken);
