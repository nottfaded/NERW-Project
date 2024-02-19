using backend.Models;

namespace backend.Interfaces
{
    public interface ISession
    {
        public Task AddSession(Session session);
        public Task<List<Session>> GetSessionsByAccount(Account account);
    }
}
