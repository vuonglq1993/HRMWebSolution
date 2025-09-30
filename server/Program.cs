using Microsoft.EntityFrameworkCore;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<HrmwebContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure pipeline
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();