using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class AccountRepository : IAccount
    {
        private readonly MyDbContext _contex;

        public AccountRepository(MyDbContext contex)
        {
            _contex = contex;
        }

        public async Task<Account?> GetAccountByEmail(string email) => await _contex.Accounts.FirstOrDefaultAsync(a => a.Email == email);
        public async Task<Account?> GetAccountById(int id) => await _contex.Accounts.FirstOrDefaultAsync(a => a.Id == id);
    }
}
