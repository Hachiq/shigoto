using Core.Enums;
using Core.Shared;

namespace Core.Entities;

public class Role : BaseEntity
{
    public RoleEnum Key { get; set; }
    public List<UserRole> UserRoles { get; set; }
}
