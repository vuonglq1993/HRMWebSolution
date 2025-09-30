using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Company
{
    public int Id { get; set; }

    public string? Address { get; set; }

    public string? Description { get; set; }

    public string? Email { get; set; }

    public string? Logo { get; set; }

    public string? NameCompany { get; set; }

    public string? PhoneNumber { get; set; }

    public int? Status { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<FollowCompany> FollowCompanies { get; set; } = new List<FollowCompany>();

    public virtual ICollection<Recruitment> Recruitments { get; set; } = new List<Recruitment>();

    public virtual User? User { get; set; }
}
