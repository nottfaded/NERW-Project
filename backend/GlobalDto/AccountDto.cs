using backend.Models;

namespace backend.GlobalDto
{
    public class AccountDto
    {
        public int Id { get; set; }
        public Role Role { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int Bill { get; set; }
        public string ReferralCode { get; set; } = string.Empty;
        public int CountReferralAplied { get; set; }
        public List<NotifySetting> NotifySettings { get; set; } = new();
        public PsychologistInfo? PsychInfo { get; set; } = null;
    }
}
