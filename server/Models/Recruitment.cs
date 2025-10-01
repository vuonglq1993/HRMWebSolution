using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Recruitment
{
    public int Id { get; set; }

    public string Address { get; set; } = null!;

    public string CreatedAt { get; set; } = null!;

    public string? Description { get; set; }

    public string Experience { get; set; } = null!;

    public string Quantity { get; set; } = null!;

    public string Rank { get; set; } = null!;

    public string Salary { get; set; } = null!;

    public int Status { get; set; }

    public string Title { get; set; } = null!;

    public string Type { get; set; } = null!;

    public int Views { get; set; }

    public int CategoryId { get; set; }

    public int CompanyId { get; set; }

    public string Deadline { get; set; } = null!;

    public virtual ICollection<Applypost> Applyposts { get; set; } = new List<Applypost>();

    public virtual Category Category { get; set; } = null!;

    public virtual Company Company { get; set; } = null!;

    public virtual ICollection<SaveJob> SaveJobs { get; set; } = new List<SaveJob>();
}
