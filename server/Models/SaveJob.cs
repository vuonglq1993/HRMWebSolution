using System;
using System.Collections.Generic;

namespace server.Models;

public partial class SaveJob
{
    public int Id { get; set; }

    public int RecruitmentId { get; set; }

    public int UserId { get; set; }

    public virtual Recruitment Recruitment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
