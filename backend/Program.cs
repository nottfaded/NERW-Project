using backend;
using backend.Core;
using backend.Interfaces;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ISession = backend.Interfaces.ISession;

var builder = WebApplication.CreateBuilder(args);

// Configuration
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

var configuration = builder.Configuration;
var jwtService = new JwtService(configuration);

// Add services to the container.
builder.Services
    .AddDbContext<MyDbContext>(options =>
        options.UseMySql(
            configuration.GetConnectionString("MySqlConnection"),
            new MySqlServerVersion(new Version(8, 0, 27))
        ))
    .AddSingleton(configuration)
    .AddControllers();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = jwtService.GetTokenValidationParameters();
});
builder.Services.AddScoped<JwtService>();


builder.Services.AddScoped<IAccount, AccountRepository>();
builder.Services.AddScoped<ISession, SessionRepository>();

var app = builder.Build();
// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseCors(b =>
{
    b.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();