using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ISession = backend.Interfaces.ISession;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly IAccount _account;
        private readonly ISession _session;

        public SessionsController(IAccount account, ISession session)
        {
            _account = account;
            _session = session;
        }

        //[HttpPost("test")]
        //public async Task<IActionResult> Test()
        //{
        //    var client = await _account.GetAccountById(7);
        //    var psycho = await _account.GetAccountById(8);

        //    if (client is not { Role: Role.Client })
        //    {
        //        return BadRequest();
        //    }

        //    if (psycho is not { Role: Role.Psychologist })
        //    {
        //        return BadRequest();
        //    }

        //    await _session.AddSession(new Session()
        //    {
        //        Client = client,
        //        ClientId = client.Id,
        //        Psycho = psycho,
        //        PsychoId = psycho.Id,
        //        Date = DateTime.Now,
        //        CountMinutes = 50,
        //    });

        //    return Ok();
        //}

        [HttpGet("getSessions/{userId}")]
        public async Task<IActionResult> GetSessionsByUser(int userId)
        {
            var user = await _account.GetById(userId, false);

            if (user == null) return NotFound();

            var sessions = await _session.GetByAccount(user);
            var sessionsFilter = user.Role == Role.Client
                ? sessions.Select(i => new
                {
                    i.Id,
                    i.ClientPhone,
                    i.Date,
                    i.CountMinutes,
                    i.City,
                    i.Street,
                    status = i.Status.ToString(),
                    i.Rating,
                    User = new { i.Psycho.Firstname, i.Psycho.Lastname, i.Psycho.Email, i.Psycho.Phone }
                })
                : sessions.Select(i => new
                {
                    i.Id,
                    i.ClientPhone,
                    i.Date,
                    i.CountMinutes,
                    i.City,
                    i.Street,
                    status = i.Status.ToString(),
                    i.Rating,
                    User = new { i.Client.Firstname, i.Client.Lastname, i.Client.Email, i.Client.Phone }
                });


            return Ok(sessionsFilter);
        }

    }
}
