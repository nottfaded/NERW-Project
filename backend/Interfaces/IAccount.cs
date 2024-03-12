using backend.GlobalDto;
using backend.Models;

namespace backend.Interfaces
{
    public interface IAccount
    {
        public Task<bool> ExistsByEmail(string email);
        public Task<Account?> GetByEmail(string email, bool psychInfo = true);
        public Task<Account?> GetById(int id, bool psychInfo = true);

        public AccountDto GetDto(Account account);
    }
}
