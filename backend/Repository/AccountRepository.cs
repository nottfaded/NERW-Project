using backend.GlobalDto;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;

namespace backend.Repository
{
    public class AccountRepository : IAccount
    {
        private readonly MyDbContext _contex;

        public AccountRepository(MyDbContext contex)
        {
            _contex = contex;
        }

        public async Task<bool> ExistsByEmail(string email)
        {
            return await _contex.Accounts.AnyAsync(a => a.Email == email);
        }
        public async Task<Account?> GetByEmail(string email, bool psychInfo = true)
        {
            try
            {
                if (psychInfo)
                {
                    var acc = await _contex.Accounts
                        .Include(a => a.PsychologistInfo)
                        .DefaultIfEmpty()
                        .FirstOrDefaultAsync(a => a != null && a.Email == email);

                    if (acc?.PsychologistInfo == null) return acc;

                    var psychologist = await _contex.PsychologistInfo
                        .Include(i => i.Specializations)
                        .FirstOrDefaultAsync(i => i.AccountId == acc.Id);

                    if (psychologist == null) return acc;

                    var typesOfTherapy = await _contex.TypesOfTherapy
                        .Where(t => t.PsychologistInfos.Contains(psychologist))
                        .ToListAsync();

                    var educations = await _contex.Educations
                        .Where(i => i.PsychId == psychologist.Id)
                        .ToListAsync();

                    psychologist.Educations = educations;
                    psychologist.TypesOfTherapy = typesOfTherapy;

                    acc.PsychologistInfo = psychologist;

                    return acc;
                } 
                
                return await _contex.Accounts.FirstOrDefaultAsync(a => a.Email == email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<Account?> GetById(int id, bool psychInfo = true)
        {
            try
            {
                if (psychInfo)
                {
                    var acc = await _contex.Accounts
                        .Include(a => a.PsychologistInfo)
                        .DefaultIfEmpty()
                        .FirstOrDefaultAsync(a => a != null && a.Id == id);

                    if (acc?.PsychologistInfo == null) return acc;

                    var psychologist = await _contex.PsychologistInfo
                        .Include(i => i.Specializations)
                        .FirstOrDefaultAsync(i => i.AccountId == acc.Id);

                    if (psychologist == null) return acc;

                    var typesOfTherapy = await _contex.TypesOfTherapy
                        //.Where(t => t.PsychologistInfos.Contains(psychologist))
                        .Include(t => t.PsychologistInfos)
                        .ToListAsync();

                    var educations = await _contex.Educations
                        .Where(i => i.PsychId == psychologist.Id)
                        .ToListAsync();

                    psychologist.Educations = educations;
                    psychologist.TypesOfTherapy = typesOfTherapy;

                    acc.PsychologistInfo = psychologist;

                    return acc;
                }

                return await _contex.Accounts.FirstOrDefaultAsync(a => a.Id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public AccountDto GetDto(Account account)
        {
            return new AccountDto
            {
                Id = account.Id,
                Role = account.Role,
                Email = account.Email,
                Firstname = account.Firstname,
                Lastname = account.Lastname,
                Phone = account.Phone,
                Bill = account.Bill,
                ReferralCode = account.ReferralCode,
                CountReferralAplied = account.CountReferralAplied,
                NotifySettings = account.NotifySettings,
                PsychInfo = account.PsychologistInfo
            };
        }
    }
}
