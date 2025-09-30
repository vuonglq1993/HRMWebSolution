using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Cv
{
    public int Id { get; set; }

    public string? FileName { get; set; }

    public int? UserId { get; set; }
}
