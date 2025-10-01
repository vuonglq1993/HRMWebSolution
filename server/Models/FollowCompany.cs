using System;
using System.Collections.Generic;

namespace server.Models;

public partial class FollowCompany
{
    public int Id { get; set; }

    public int CompanyId { get; set; }

    public int UserId { get; set; }

    public virtual Company Company { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
