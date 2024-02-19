using backend.Models;

namespace backend.Interfaces
{
    public interface IAccount
    {
        public Task<Account?> GetAccountByEmail(string email);
        public Task<Account?> GetAccountById(int id);
    }
}
