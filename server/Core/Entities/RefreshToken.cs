using Core.Shared;

namespace Core.Entities;

public class RefreshToken : BaseEntity
{
    public string Token { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
}
