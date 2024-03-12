using backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ISession = backend.Interfaces.ISession;

namespace backend.Repository
{
    public class SessionRepository : ISession
    {
        private readonly MyDbContext _contex;

        public SessionRepository(MyDbContext contex)
        {
            _contex = contex;
        }


        public async Task AddSession(Session session)
        {
            await _contex.Sessions.AddAsync(session);
            await _contex.SaveChangesAsync();
        }

        public async Task<List<Session>> GetByAccount(Account account)
        {
            return account.Role switch
            {
                Role.Client => await _contex.Sessions
                    .Where(s => s.ClientId == account.Id)
                    .Include(s => s.Psycho)
                    .ToListAsync(),

                Role.Psychologist => await _contex.Sessions
                    .Where(s => s.PsychoId == account.Id)
                    .Include(s => s.Client)
                    .ToListAsync(),

                _ => new List<Session>()
            };
        }

        public async Task<List<Session>> GetActive(Account account)
        {
            return account.Role switch
            {
                Role.Client => await _contex.Sessions
                    .Where(s => s.ClientId == account.Id && DateTime.Now > s.Date)
                    .Include(s => s.Psycho)
                    .ToListAsync(),

                Role.Psychologist => await _contex.Sessions
                    .Where(s => s.PsychoId == account.Id && DateTime.Now > s.Date)
                    .Include(s => s.Client)
                    .ToListAsync(),

                _ => new List<Session>()
            };
        }
    }
}
