using Core.Enums;
using Core.Shared;

namespace Core.Entities;

public class Role : BaseEntity
{
    public required RoleEnum Key { get; set; }
    public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
