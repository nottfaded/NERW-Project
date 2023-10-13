using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text;
using backend.Core;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccount _account;
        private readonly MyDbContext _context;
        private readonly JwtService _jwtService;

        public AccountsController(IAccount account, MyDbContext context, JwtService jwtService)
        {
            _account = account;
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateNewAccount([FromBody] AccountCreateDto account)
        {
            if(await _account.GetAccountByEmail(account.Email) != null) return BadRequest();
            await _context.Accounts.AddAsync(new Account()
            {
                Name = account.Name,
                Surname = account.Surname,
                DateOfBirth = account.Birthday,
                Email = account.Email,
                Password = Hasher.HashPassword(account.Password),
                Role = Role.Клієнт,
            });
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("logIn")]
        public async Task<IActionResult> AuthenticateAccount([FromBody] AccountLogInDto logInData)
        {
            var account = await _account.GetAccountByEmail(logInData.Email);
            if(account == null) return Unauthorized(1);
            if (!Hasher.VerifyPassword(logInData.Password, account.Password)) return Unauthorized(2);

            var jwtToken = _jwtService.Generate(account);
            return Ok(new {jwtToken, account});
        }

        [HttpGet("client")]
        [Authorize(Roles = nameof(Role.Клієнт))]
        public IActionResult ClickClient()
        {
            return Ok();
        }
        [HttpGet("psyhologist")]
        [Authorize(Roles = nameof(Role.Психолог))]
        public IActionResult ClickPsyhologist()
        {
            return Ok();
        }
        [HttpGet("all")]
        [Authorize(Roles = $"{nameof(Role.Психолог)},{nameof(Role.Клієнт)}")]
        public IActionResult ClickAll()
        {
            return Ok();
        }
        
    }
    public record AccountCreateDto
    {
        [Required]
        [MinLength(3)]
        public string Name { get; set; }
        [Required]
        [MinLength(3)]
        public string Surname { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
    }

    public record AccountLogInDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
