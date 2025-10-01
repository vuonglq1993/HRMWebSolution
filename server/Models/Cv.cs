using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Cv
{
    public int Id { get; set; }

    public string FileName { get; set; } = null!;

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
