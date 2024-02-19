using System.ComponentModel.DataAnnotations;
using backend.Core;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IAccount _account;
        private readonly JwtService _jwtService;
        private readonly MyDbContext _context;

        public SettingsController(IAccount account, JwtService jwtService, MyDbContext context)
        {
            _account = account;
            _jwtService = jwtService;
            _context = context;
        }

        [HttpPost("changeFirstName")]
        [Authorize]
        public async Task<IActionResult> ChangeFirstName(NewAccountData data)
        {
            var account = await _account.GetAccountById(data.Id);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.FirstName == string.Empty) return BadRequest();

            account.Name = data.FirstName;
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("changeLastName")]
        [Authorize]
        public async Task<IActionResult> ChangeLastName(NewAccountData data)
        {
            var account = await _account.GetAccountById(data.Id);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.LastName == string.Empty) return BadRequest();

            account.Surname = data.LastName;
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("changePhone")]
        [Authorize]
        public async Task<IActionResult> ChangePhone(NewAccountData data)
        {
            var account = await _account.GetAccountById(data.Id);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.Phone == string.Empty) return BadRequest();

            account.Phone = data.Phone;
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("changeEmail")]
        [Authorize]
        public async Task<IActionResult> ChangeEmail(NewAccountData data)
        {
            var account = await _account.GetAccountById(data.Id);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.Email == string.Empty) return BadRequest();

            account.Email = data.Email;
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(NewAccountData data)
        {
            var account = await _account.GetAccountById(data.Id);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.PrevPassword == string.Empty || data.NewPassword == string.Empty) return BadRequest();
            if(!Hasher.VerifyPassword(data.PrevPassword, account.Password)) return BadRequest("Невірний пароль");

            account.Password = Hasher.HashPassword(data.NewPassword);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("changeNotify")]
        [Authorize]
        public async Task<IActionResult> ChangeNotify(ChangeNotifyData data)
        {
            var account = await _account.GetAccountById(data.Id);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();
            if(data.Event == string.Empty) return BadRequest();

            switch (data.Event)
            {
                case "mail":
                    account.NotifySettings[data.Index].Mail = !account.NotifySettings[data.Index].Mail;
                    break;
                case "telegram":
                    account.NotifySettings[data.Index].Telegram = !account.NotifySettings[data.Index].Telegram;
                    break;
                case "site":
                    account.NotifySettings[data.Index].Site = !account.NotifySettings[data.Index].Site;
                    break;
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        public record NewAccountData
        {
            [Required]
            public int Id { get; set; }
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
            public string PrevPassword { get; set; } = string.Empty;
            public string NewPassword { get; set; } = string.Empty;
        }

        public record ChangeNotifyData
        {
            [Required]
            public int Id { get; set; }
            public int Index { get; set; }
            public string Event { get; set; } = string.Empty;
        }
    }
}
