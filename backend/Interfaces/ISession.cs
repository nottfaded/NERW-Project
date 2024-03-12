using backend.Models;

namespace backend.Interfaces
{
    public interface ISession
    {
        public Task AddSession(Session session);
        public Task<List<Session>> GetByAccount(Account account);
        public Task<List<Session>> GetActive(Account account);
    }
}
