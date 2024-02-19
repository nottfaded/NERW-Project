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

            var notifySettings = new List<NotifySetting>
            {
                new() { Name = "SessionNotPaid" },
                new() { Name = "SessionTransfer" },
                new() { Name = "SessionCancellation" },
                new() { Name = "TaskReminders" },
                new() { Name = "OneHoureBefore" },
            };
            await _context.Accounts.AddAsync(new Account
            {
                Name = account.Name,
                Email = account.Email,
                Password = Hasher.HashPassword(account.Password),
                Role = Role.Client,
                NotifySettings = notifySettings
            });
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("logIn")]
        public async Task<IActionResult> AuthenticateAccount([FromBody] AccountLogInDto logInData)
        {
            var account = await _account.GetAccountByEmail(logInData.Email);
            if(account == null) return NotFound(1);
            if (!Hasher.VerifyPassword(logInData.Password, account.Password)) return NotFound(2);

            var jwtToken = _jwtService.Generate(account);
            var accData = new
            {
                account.Id,
                account.Role,
                account.Email,
                account.Name,
                account.Surname,
                account.NotifySettings,
                account.Phone
            };
            return Ok(new {jwtToken, accData });
        }

        [HttpPost("forgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] string email)
        {
            var account = await _account.GetAccountByEmail(email);
            if (account == null) return NotFound();

            if (account.RepairCode != null && (DateTime.Now - account.CreatedCode).TotalMinutes < 2)
                return BadRequest();

            var code = new StringBuilder();
            var rand = new Random();
            for (var i = 0; i < 6; i++)
            {
                code.Append(rand.Next(0, 10));
            }

            account.RepairCode = code.ToString();
            account.CreatedCode = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(code);
        }
        [HttpPost("checkRepairCode")]
        public async Task<IActionResult> CheckRepairCode([FromBody] RepairCodeDto data)
        {
            var account = await _account.GetAccountByEmail(data.Email);
            if (account == null) return NotFound();

            if (account.RepairCode == null)
                return BadRequest("Щось трапилось не так");
            if (account.RepairCode != data.Code)
                return BadRequest("Неправильний код");

            return Ok();
        }
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto data)
        {
            var account = await _account.GetAccountByEmail(data.Email);
            if (account == null) return NotFound();

            account.Password = Hasher.HashPassword(data.NewPassword);
            await _context.SaveChangesAsync();

            return Ok();
        }

        //[HttpGet("client")]
        //[Authorize(Roles = nameof(Role.Клієнт))]
        //public IActionResult ClickClient()
        //{
        //    return Ok();
        //}
        //[HttpGet("psyhologist")]
        //[Authorize(Roles = nameof(Role.Психолог))]
        //public IActionResult ClickPsyhologist()
        //{
        //    return Ok();
        //}
        //[HttpGet("all")]
        //[Authorize(Roles = $"{nameof(Role.Psychologist)},{nameof(Role.Client)}")]
        //public IActionResult ClickAll()
        //{
        //    return Ok();
        //}

    }
    public record AccountCreateDto
    {
        [Required]
        [MinLength(3)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
    public record AccountLogInDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
    public record RepairCodeDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Code { get; set; }
    }
    public record ChangePasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
