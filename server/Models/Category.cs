using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int NumberChoose { get; set; }

    public virtual ICollection<Recruitment> Recruitments { get; set; } = new List<Recruitment>();
}
