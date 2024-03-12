using System.ComponentModel.DataAnnotations;
using System.Linq;
using backend.Core;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ISession = backend.Interfaces.ISession;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IAccount _account;
        private readonly ISession _session;
        private readonly JwtService _jwtService;
        private readonly MyDbContext _context;

        public SettingsController(IAccount account, JwtService jwtService, MyDbContext context, ISession session)
        {
            _account = account;
            _jwtService = jwtService;
            _context = context;
            _session = session;
        }

        [HttpPost("changeFirstName")]
        [Authorize]
        public async Task<IActionResult> ChangeFirstName(NewAccountData data)
        {
            var account = await _account.GetById(data.Id, false);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.FirstName == string.Empty) return BadRequest();

            account.Firstname = data.FirstName;
            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }
        
        [HttpPost("changeLastName")]
        [Authorize]
        public async Task<IActionResult> ChangeLastName(NewAccountData data)
        {
            var account = await _account.GetById(data.Id, false);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.LastName == string.Empty) return BadRequest();

            account.Lastname = data.LastName;
            
            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }
        
        [HttpPost("changePhone")]
        [Authorize]
        public async Task<IActionResult> ChangePhone(NewAccountData data)
        {
            var account = await _account.GetById(data.Id, false);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.Phone == string.Empty) return BadRequest();

            account.Phone = data.Phone;
            
            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }
        
        [HttpPost("changeEmail")]
        [Authorize]
        public async Task<IActionResult> ChangeEmail(NewAccountData data)
        {
            var account = await _account.GetById(data.Id, false);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.Email == string.Empty) return BadRequest();

            account.Email = data.Email;
            
            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }
        
        [HttpPost("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(NewAccountData data)
        {
            var account = await _account.GetById(data.Id, false);
            if (account == null) return NotFound();

            var token = _jwtService.GetTokenFromHttpContext(HttpContext);
            if (!_jwtService.ValidById(account.Id, token)) return Forbid();

            if (data.PrevPassword == string.Empty || data.NewPassword == string.Empty) return BadRequest();
            if(!Hasher.VerifyPassword(data.PrevPassword, account.Password)) return BadRequest("Невірний пароль");

            account.Password = Hasher.HashPassword(data.NewPassword);
            
            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }
        
        [HttpPost("changeNotify")]
        [Authorize]
        public async Task<IActionResult> ChangeNotify(ChangeNotifyData data)
        {
            var account = await _account.GetById(data.Id, false);
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

            var str = await _context.TrySaveChanges();
            if (str != null) return BadRequest(str);

            return Ok();
        }

        [HttpGet("allAllDataForSettings")]
        [Authorize]
        public async Task<IActionResult> GetAllDataForSettings()
        {
            return Ok(new{ _context.Specializations, _context.TypesOfTherapy });
        }

        [HttpPost("sendChangesPsychInfo")]
        [Authorize(Roles = nameof(Role.Psychologist))]
        public async Task<IActionResult> SendChangesForPsychInfo([FromBody] ChangePsychInfo data)
        {
            try
            {
                var acc = await _account.GetById(data.AccountId);
                if (acc?.PsychologistInfo == null) return BadRequest();

                var sessions = await _session.GetActive(acc);
                if (sessions.Count > 0) return BadRequest();

                var specializations = _context.Specializations.ToList();
                var typeOfTherapies = _context.TypesOfTherapy.ToList();

                acc.PsychologistInfo.Activated = false;


                foreach (var spec in acc.PsychologistInfo.Specializations.ToList())
                {
                    if (data.Specializations.All(i => i.Id != spec.Id))
                    {
                        acc.PsychologistInfo.Specializations.Remove(spec);
                    }
                }
                var addSpecialization = new List<Specialization>();
                foreach (var specDto in data.Specializations)
                {
                    if (acc.PsychologistInfo.Specializations.All(i => i.Id != specDto.Id))
                    {
                        var spec = specializations.FirstOrDefault(i => i.Id == specDto.Id);
                        if (spec == null)
                        {
                            // exception
                            continue;
                        }
                        addSpecialization.Add(spec);
                    }
                }
                acc.PsychologistInfo.Specializations.AddRange(addSpecialization);

                //acc.PsychologistInfo.Specializations.Clear();
                //foreach (var spec in data.Specializations)
                //{
                //    var specialization = await _context.Specializations.FindAsync(spec.Id);
                //    if (specialization == null)
                //    {
                //        return BadRequest("specialization == null");
                //    }
                //    acc.PsychologistInfo.Specializations.Add(specialization);
                //}

                acc.PsychologistInfo.Languages = data.Languages;
                acc.PsychologistInfo.Year = data.Year;
                acc.PsychologistInfo.OnlineMeet = data.OnlineMeet;
                acc.PsychologistInfo.IntramuralMeet = data.IntramuralMeet;
                acc.PsychologistInfo.City = data.City;
                acc.PsychologistInfo.Address = data.Address;
                acc.PsychologistInfo.PersonalTherapy = data.PersonalTherapy;
                acc.PsychologistInfo.FamilyTherapy = data.FamilyTherapy;
                acc.PsychologistInfo.ChildrenTherapy = data.ChildrenTherapy;


                //foreach (var typeOfTherapy in acc.PsychologistInfo.TypesOfTherapy.ToList())
                //{
                //    if (data.TypesOfTherapy.All(i => i.Id != typeOfTherapy.Id))
                //    {
                //        acc.PsychologistInfo.TypesOfTherapy.Remove(typeOfTherapy);
                //    }
                //}
                acc.PsychologistInfo.TypesOfTherapy.RemoveAll(i => data.TypesOfTherapy.All(j => i.Id != j.Id));
                var addTypeOfTherapy = new List<TypeOfTherapy>();
                foreach (var typeOfTherapy in data.TypesOfTherapy)
                {
                    if (acc.PsychologistInfo.TypesOfTherapy.All(i => i.Id != typeOfTherapy.Id))
                    {
                        var item = typeOfTherapies.FirstOrDefault(i => i.Id == typeOfTherapy.Id);
                        if (item == null)
                        {
                            // exception
                            continue;
                        }
                        addTypeOfTherapy.Add(item);
                    }
                }
                acc.PsychologistInfo.TypesOfTherapy.AddRange(addTypeOfTherapy);

                //acc.PsychologistInfo.TypesOfTherapy.Clear();
                //foreach (var therapy in data.TypesOfTherapy) // fix
                //{
                //    var therapyOfType = await _context.TypesOfTherapy.SingleOrDefaultAsync(t => t.Name == therapy.Name);

                //    if (therapyOfType == null) return BadRequest($"therapyOfType({therapy.Name}) == null");

                //    acc.PsychologistInfo.TypesOfTherapy.Add(therapyOfType);
                //}

                acc.PsychologistInfo.Educations.Clear();
                foreach (var ed in data.Educations)
                {
                    acc.PsychologistInfo.Educations.Add(new Education
                    {
                        Faculty = ed.Faculty,
                        University = ed.University,
                        Year = ed.Year,
                        PsychId = acc.PsychologistInfo.Id,
                        Psych = acc.PsychologistInfo
                    });
                }

                acc.PsychologistInfo.PersonalPrice = data.PersonalPrice;
                acc.PsychologistInfo.PersonalSalary = data.PersonalSalary;
                acc.PsychologistInfo.FamilyPrice = data.FamilyPrice;
                acc.PsychologistInfo.FamilySalary = data.FamilySalary;
                acc.PsychologistInfo.ChildrenPrice = data.ChildrenPrice;
                acc.PsychologistInfo.ChildrenSalary = data.ChildrenSalary;

                await _context.SaveChangesAsync();

                var accDto = _account.GetDto(acc);

                return Ok(accDto);
            }
            catch (Exception e){
                return BadRequest(e);
            }
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

        public record ChangePsychInfo
        {
            public int AccountId { get; set; }
            public List<SpecializationDto> Specializations { get; set; } = new();
            public List<string> Languages { get; set; } = new();
            public int? Year { get; set; }
            public bool OnlineMeet { get; set; }
            public bool IntramuralMeet { get; set; }
            public string? City { get; set; }
            public string? Address { get; set; }
            public bool PersonalTherapy { get; set; }
            public bool FamilyTherapy { get; set; }
            public bool ChildrenTherapy { get; set; }
            public List<TypeOfTherapyDto> TypesOfTherapy { get; set; } = new();
            public List<EducationDto> Educations { get; set; } = new();
            public int PersonalPrice { get; set; } 
            public int PersonalSalary { get; set; }
            public int FamilyPrice { get; set; }
            public int FamilySalary { get; set; }
            public int ChildrenPrice { get; set; }
            public int ChildrenSalary { get;set; }

            public record SpecializationDto
            {
                public int Id { get; set; }
                public string Type { get; set; } = string.Empty;
            }
            public record TypeOfTherapyDto
            {
                public int Id { get; set; }
                public string Name { get; set; } = string.Empty;
            }
            public record EducationDto
            {
                public string University { get; set; } = string.Empty;
                public string Faculty { get; set; } = string.Empty;
                public int? Year { get; set; }
            }
        }
    }
}
