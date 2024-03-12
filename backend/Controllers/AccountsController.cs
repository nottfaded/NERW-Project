using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text;
using backend.Core;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


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
            if (await _account.ExistsByEmail(account.Email)) return BadRequest();

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
                Firstname = account.Name,
                Email = account.Email,
                Password = Hasher.HashPassword(account.Password),
                Role = Role.Client,
                NotifySettings = notifySettings
            });

            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }

        [HttpGet("test")] // must be removed
        public async Task<IActionResult> Test()
        {
            var test = await _account.GetByEmail("p@p.p");

            return Ok(test);
        }

        [HttpPost("logIn")]
        public async Task<IActionResult> AuthenticateAccount([FromBody] AccountLogInDto logInData)
        {
            var account = await _account.GetByEmail(logInData.Email);
            if (account == null) return NotFound(1);
            if (!Hasher.VerifyPassword(logInData.Password, account.Password)) return NotFound(2);

            var jwtToken = _jwtService.Generate(account);
            var accDto = _account.GetDto(account);

            var specializations = _context.Specializations.ToList();

            return Ok(new { jwtToken, accDto, specializations });
        }

        [HttpPost("forgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] string email)
        {
            var account = await _account.GetByEmail(email, false);
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

            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok(code);
        }
        [HttpPost("checkRepairCode")]
        public async Task<IActionResult> CheckRepairCode([FromBody] RepairCodeDto data)
        {
            var account = await _account.GetByEmail(data.Email, false);
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
            var account = await _account.GetByEmail(data.Email, false);
            if (account == null) return NotFound();

            account.Password = Hasher.HashPassword(data.NewPassword);
            
            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }

        //[HttpGet("client")]
        //[Authorize(Roles = nameof(Role.Клієнт))]
        //public IActionResult ClickClient()
        //{
        //    return Ok();
        //}
        //[HttpGet("psyhologist")]
        //[Authorize(Roles = nameof(Role.Client))]
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
    
}
