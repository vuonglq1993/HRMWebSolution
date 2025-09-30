using System;
using System.Collections.Generic;

namespace server.Models;

public partial class User
{
    public int Id { get; set; }

    public string? Address { get; set; }

    public string? Description { get; set; }

    public string? Email { get; set; }

    public string? FullName { get; set; }

    public string? Image { get; set; }

    public string? Password { get; set; }

    public string? PhoneNumber { get; set; }

    public int? Status { get; set; }

    public int? RoleId { get; set; }

    public virtual ICollection<Applypost> Applyposts { get; set; } = new List<Applypost>();

    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    public virtual ICollection<FollowCompany> FollowCompanies { get; set; } = new List<FollowCompany>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<SaveJob> SaveJobs { get; set; } = new List<SaveJob>();
}
