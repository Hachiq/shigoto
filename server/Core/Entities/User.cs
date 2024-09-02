﻿using Core.Shared;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class User : BaseEntity
{
    public string Username {  get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public Guid RefreshTokenId { get; set; }
    public RefreshToken RefreshToken { get; set; }
    public List<UserRole> UserRoles { get; set; }
}
