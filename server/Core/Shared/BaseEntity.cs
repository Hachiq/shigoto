﻿using System.ComponentModel.DataAnnotations;

namespace Core.Shared;

public class BaseEntity
{
    [Key]
    public Guid Id { get; set; }
}
