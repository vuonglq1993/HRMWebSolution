using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Applypost
{
    public int Id { get; set; }

    public string CreatedAt { get; set; } = null!;

    public int RecruitmentId { get; set; }

    public int UserId { get; set; }

    public string NameCv { get; set; } = null!;

    public int Status { get; set; }

    public string? Text { get; set; }

    public virtual Recruitment Recruitment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
