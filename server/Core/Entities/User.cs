using Core.Shared;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class User : BaseEntity
{
    public required string Username {  get; set; }
    [EmailAddress]
    public required string Email { get; set; }
    public bool EmailConfirmed { get; set; } = false;
    public required Guid EmailConfirmationToken { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
    public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
