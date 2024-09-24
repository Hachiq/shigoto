using Core.Shared;

namespace Core.Entities;

public class RefreshToken : BaseEntity
{
    public required string Token { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime ExpiresAt { get; set; }
}
