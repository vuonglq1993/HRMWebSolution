using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Recruitment
{
    public int Id { get; set; }

    public string? Address { get; set; }

    public string? CreatedAt { get; set; }

    public string? Description { get; set; }

    public string? Experience { get; set; }

    public string? Quantity { get; set; }

    public string? Rank { get; set; }

    public string? Salary { get; set; }

    public int? Status { get; set; }

    public string? Title { get; set; }

    public string? Type { get; set; }

    public int? Views { get; set; }

    public int? CategoryId { get; set; }

    public int? CompanyId { get; set; }

    public string? Deadline { get; set; }

    public virtual ICollection<Applypost> Applyposts { get; set; } = new List<Applypost>();

    public virtual Category? Category { get; set; }

    public virtual Company? Company { get; set; }

    public virtual ICollection<SaveJob> SaveJobs { get; set; } = new List<SaveJob>();
}
